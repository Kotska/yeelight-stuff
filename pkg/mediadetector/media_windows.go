//go:build windows
// +build windows

package mediadetector

import (
	"context"
	"log"
	"time"

	"github.com/fatih/color"
	"github.com/go-ole/go-ole"
	"github.com/moutend/go-wca/pkg/wca"
)

func Detector(ctx context.Context, isPlaying *bool) {
	// Initialize OLE (COM)
	if err := ole.CoInitialize(0); err != nil {
		log.Fatalf("CoInitialize failed: %v", err)
	}
	defer ole.CoUninitialize()

	// Create MMDeviceEnumerator
	var deviceEnumerator *wca.IMMDeviceEnumerator
	err := wca.CoCreateInstance(
		wca.CLSID_MMDeviceEnumerator,
		0,
		wca.CLSCTX_ALL,
		wca.IID_IMMDeviceEnumerator,
		&deviceEnumerator,
	)
	if err != nil {
		log.Fatalf("CoCreateInstance failed: %x\n", err)
	}

	// Get the default audio endpoint
	var device *wca.IMMDevice
	err = deviceEnumerator.GetDefaultAudioEndpoint(wca.ERender, wca.EMultimedia, &device)
	if err != nil {
		log.Fatalf("GetDefaultAudioEndpoint failed: %x\n", err)
	}

	// Activate IAudioSessionManager2
	var sessionManager *wca.IAudioSessionManager2
	err = device.Activate(wca.IID_IAudioSessionManager2, wca.CLSCTX_ALL, nil, &sessionManager)
	if err != nil {
		log.Fatalf("Activate failed: %x\n", err)
	}

	ticker := time.NewTicker(1 * time.Second)
	quit := make(chan struct{})
	go func(sessionManager *wca.IAudioSessionManager2) {
		for {
			select {
			case <-ticker.C:
				// do the task here
				playing := getPlaying(sessionManager)
				*isPlaying = playing
				// color.Yellow("Playing: ", playing)
			case <-quit:
				defer deviceEnumerator.Release()
				defer device.Release()
				defer sessionManager.Release()
				ticker.Stop()
				return
			}
		}
	}(sessionManager)

	// playingChan := make(chan bool)
	// go getPlaying(ctx, sessionManager, playingChan)
	// go func() {
	// 	for n := range playingChan {
	// 		color.Yellow("Playing: %d, ", n)
	// 		*isPlaying = n
	// 	}
	// }()

}

func getPlaying(sessionManager *wca.IAudioSessionManager2) bool {
	playing := false
	// Get IAudioSessionEnumerator
	var sessionEnumerator *wca.IAudioSessionEnumerator
	err := sessionManager.GetSessionEnumerator(&sessionEnumerator)
	if err != nil {
		color.Red("GetSessionEnumerator failed: %x\n", err)
	}
	defer sessionEnumerator.Release()

	sessionCount := 0
	err = sessionEnumerator.GetCount(&sessionCount)
	if err != nil {
		color.Red("Error getting sessions: %d\n", err)
	}
	// color.Yellow("Running, with %v sessions\n", sessionCount)

	// Iterate through each session and check if it's active
	for i := 0; i < sessionCount; i++ {
		var sessionControl *wca.IAudioSessionControl
		err = sessionEnumerator.GetSession(i, &sessionControl)
		if err != nil {
			color.Red("GetSession failed: %x\n", err)
		}
		defer sessionControl.Release()

		state := uint32(0)
		err := sessionControl.GetState(&state)
		if err != nil {
			color.Red("GetState failed: %x\n", err)
		}

		if state == wca.AudioSessionStateActive {
			// color.Green("Audio session %d is playing\n", i)
			playing = true
		}
	}
	return playing
}
