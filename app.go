package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/fatih/color"
	"github.com/oherych/yeelight"
)

// App struct
type App struct {
	ctx           context.Context
	Configuration Configuration
}

type Device struct {
	Version  string
	Id       string
	Location string
	Model    string
	Name     string
	Support  []string
	Power    bool
}

type Configuration struct {
	Devices []Device
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.setupConfig()
}

func (a *App) setupConfig() {
	value, _ := os.UserConfigDir()
	path := filepath.Join(value, "yeelight-stuff")
	_ = os.Mkdir(path, 0755)
	fullPath := filepath.Join(path, "config.json")
	color.Yellow("Config file path: %v", fullPath)

	file, err := os.OpenFile(fullPath, os.O_CREATE|os.O_RDWR, 0600)
	if err != nil {
		color.Red("Could not load config file:", err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	a.Configuration = Configuration{}
	err = decoder.Decode(&a.Configuration)
	if err != nil {
		color.Red("Could not decode config:", err)
	}
}

func (a *App) updateConfig() {
	value, _ := os.UserConfigDir()
	path := filepath.Join(value, "yeelight-stuff")
	fullPath := filepath.Join(path, "config.json")
	file, err := os.OpenFile(fullPath, os.O_WRONLY, 0600)
	if err != nil {
		color.Red("Could not update config file: ", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	err = encoder.Encode(a.Configuration)
	if err != nil {
		color.Red("Could not encode config: ", err)
	}

}

func (a *App) NewFullDevice(location string, name string, version string, id string, model string, support []string, power bool) Device {
	newDevice := Device{
		Version:  version,
		Id:       id,
		Location: location,
		Model:    model,
		Name:     name,
		Support:  support,
		Power:    power,
	}

	deviceWithSameName := 0

	for _, d := range a.Configuration.Devices {
		if d.Location == newDevice.Location {
			return d
		}

		if strings.Contains(d.Name, newDevice.Name) {
			deviceWithSameName++
		}
	}

	if deviceWithSameName > 0 {
		newDevice.Name = newDevice.Name + " " + strconv.Itoa(deviceWithSameName)
	}

	a.Configuration.Devices = append(a.Configuration.Devices, newDevice)

	a.updateConfig()
	return newDevice
}

func (a *App) NewBasicDevice(location string, name string) Device {
	newDevice := Device{
		Location: location,
		Name:     name,
	}

	deviceWithSameName := 0

	for _, d := range a.Configuration.Devices {
		if d.Location == newDevice.Location {
			return d
		}

		if strings.Contains(d.Name, newDevice.Name) {
			deviceWithSameName++
		}
	}

	if deviceWithSameName > 0 {
		newDevice.Name = newDevice.Name + " " + strconv.Itoa(deviceWithSameName)
	}

	a.Configuration.Devices = append(a.Configuration.Devices, newDevice)

	a.updateConfig()
	return newDevice
}

func (a *App) GetDevices() []Device {
	color.Yellow("", a.Configuration.Devices)
	return a.Configuration.Devices
}

func (a *App) DeleteDevice(location string) {
	for i, d := range a.Configuration.Devices {
		if d.Location == location {
			a.Configuration.Devices = append(a.Configuration.Devices[:i], a.Configuration.Devices[i+1:]...)
			a.updateConfig()
			return
		}
	}
}

func (a *App) DiscoverBulbs() bool {
	ctx, cancel := context.WithTimeout(a.ctx, 5*time.Second)
	defer cancel()

	devices, err := yeelight.Discovery(ctx)
	if err != nil && !errors.Is(err, context.DeadlineExceeded) {
		log.Fatalln(err)
	}

	for _, d := range devices {
		a.NewFullDevice(d.Location, d.Name, d.FirmwareVersion, d.ID, d.Model, d.Support, d.Power)
	}

	return true
}
