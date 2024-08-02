package main

import (
	"context"
	"errors"
	"log"
	"time"

	"github.com/oherych/yeelight"
)

// App struct
type App struct {
	ctx     context.Context
	devices []Device
}

type Device struct {
	Version  string
	Id       string
	Location string
	Model    string
	Name     string
	Power    bool
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) NewFullDevice(location string, name string, version string, id string, model string, power bool) Device {
	newDevice := Device{
		Version:  version,
		Id:       id,
		Location: location,
		Model:    model,
		Name:     name,
		Power:    power,
	}

	for _, d := range a.devices {
		if d.Location == newDevice.Location || d.Name == newDevice.Name {
			return d
		}
	}

	a.devices = append(a.devices, newDevice)

	return newDevice
}

func (a *App) NewBasicDevice(location string, name string) Device {
	newDevice := Device{
		Location: location,
		Name:     name,
	}

	for _, d := range a.devices {
		if d.Location == newDevice.Location || d.Name == newDevice.Name {
			return d
		}
	}

	a.devices = append(a.devices, newDevice)

	return newDevice
}

func (a *App) GetDevices() any {
	return a.devices
}

func (a *App) DiscoverBulbs() bool {
	ctx, cancel := context.WithTimeout(a.ctx, 5*time.Second)
	defer cancel()

	devices, err := yeelight.Discovery(ctx)
	if err != nil && !errors.Is(err, context.DeadlineExceeded) {
		log.Fatalln(err)
	}

	for _, d := range devices {
		a.NewFullDevice(d.Location, d.Name, d.FirmwareVersion, d.ID, d.Model, d.Power)
	}

	return true
}
