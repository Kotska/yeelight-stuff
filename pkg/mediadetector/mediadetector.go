package mediadetector

import "context"

func DetectMedia(ctx context.Context, isPlaying *bool) {
	Detector(ctx, isPlaying)
}
