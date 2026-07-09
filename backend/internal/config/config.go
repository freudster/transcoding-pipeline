
import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Config struct {
	AppPort string
	AWSRegion string
	S3BucketName string
	S3UploadPrefix string
	PresignURLExpiry time.Duration
}

func Load() (Config, error) {
	region, err := requiredEnv("AWS_REGION")
	if err != nil {
		return Config{}, err
	}

	bucketName, err := requiredEnv("S3_BUCKET_NAME")
	if err != nil {
		return Config{}, err
	}

	cfg := Config{
		AppPort:          getEnv("APP_PORT", "8080"),
		AWSRegion:        region,
		S3BucketName:     bucketName,
		S3UploadPrefix:   getEnv("S3_UPLOAD_PREFIX", "uploads/"),
		PresignURLExpiry: 15 * time.Minute,
	}

	if expiryMinutes := strings.TrimSpace(os.Getenv("PRESIGN_EXPIRES_MINUTES")); expiryMinutes != "" {
		minutes, err := strconv.Atoi(expiryMinutes)
		if err != nil || minutes <= 0 {
			return Config{}, fmt.Errorf("invalid PRESIGN_EXPIRES_MINUTES: %q", expiryMinutes)
		}
		cfg.PresignURLExpiry = time.Duration(minutes) * time.Minute
	}

	if cfg.S3UploadPrefix != "" && !strings.HasSuffix(cfg.S3UploadPrefix, "/") {
		cfg.S3UploadPrefix += "/"
	}

	return cfg, nil
}



func getEnv(key, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}
	return value
}

func requiredEnv(key string) (string, error) {
    value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return "", fmt.Errorf("%s is required", key)
	}        
	return value, nil
}
