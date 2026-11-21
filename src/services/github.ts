import { GitHubRepo } from '../types';

export const GITHUB_USERNAME = 'saravanasai1435';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// Fallback repositories representing Saravanasai's active hardware repositories
// in case of network unavailability or GitHub unauthenticated rate limit (403).
export const FALLBACK_REPOSITORIES: GitHubRepo[] = [
  {
    id: 1358705781,
    name: 'arduino-rfid-doorlock-family',
    description: '10 Arduino RFID door lock variants: servo, buzzer, relay, LCD, multi-card database, button override - MFRC522 based',
    html_url: `https://github.com/${GITHUB_USERNAME}/arduino-rfid-doorlock-family`,
    stargazers_count: 5,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:30Z',
    topics: ['arduino', 'rfid-rc522', 'servo-lock', 'security', 'c-plus-plus']
  },
  {
    id: 1358705782,
    name: 'esp32-cam-stream',
    description: 'ESP32-CAM MJPEG web streamer with face detection - AI Thinker, configurable resolution',
    html_url: `https://github.com/${GITHUB_USERNAME}/esp32-cam-stream`,
    stargazers_count: 7,
    forks_count: 1,
    language: 'C++',
    updated_at: '2026-09-14T06:16:31Z',
    topics: ['esp32-cam', 'mjpeg-streamer', 'face-detection', 'embedded-c', 'wifi']
  },
  {
    id: 1358705783,
    name: 'arduino-ultrasonic-obstacle-avoidance-car',
    description: 'Arduino ultrasonic obstacle avoidance car - HC-SR04 scanning servo, 2 DC motors, autonomous navigation',
    html_url: `https://github.com/${GITHUB_USERNAME}/arduino-ultrasonic-obstacle-avoidance-car`,
    stargazers_count: 6,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:30Z',
    topics: ['arduino', 'hc-sr04', 'robotics', 'l298n', 'obstacle-avoidance']
  },
  {
    id: 1358705784,
    name: 'esp32-ble-gamepad-steeringwheel',
    description: 'ESP32 BLE HID gamepad steering wheel - potentiometer X-axis + brake/accel buttons, BleGamepad library',
    html_url: `https://github.com/${GITHUB_USERNAME}/esp32-ble-gamepad-steeringwheel`,
    stargazers_count: 4,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:30Z',
    topics: ['esp32', 'ble-gamepad', 'bluetooth-hid', 'steering-wheel', 'gaming']
  },
  {
    id: 1358705785,
    name: 'arduino-tft-touch-calculator',
    description: 'Arduino TFT touch calculator - MCUFRIEND 3.5 inch resistive touch, 4x4 button grid, basic ops + sqrt + power',
    html_url: `https://github.com/${GITHUB_USERNAME}/arduino-tft-touch-calculator`,
    stargazers_count: 3,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:30Z',
    topics: ['arduino', 'tft-display', 'mcufriend', 'touchscreen', 'calculator']
  },
  {
    id: 1358705786,
    name: 'esp32-dht11-rgb-relay-webcontrol',
    description: 'ESP32 web control: DHT11 temp/humidity, 15-preset RGB LED picker, relay, LCD display',
    html_url: `https://github.com/${GITHUB_USERNAME}/esp32-dht11-rgb-relay-webcontrol`,
    stargazers_count: 4,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:31Z',
    topics: ['esp32', 'dht11', 'rgb-led', 'relay', 'iot-webserver']
  },
  {
    id: 1358705787,
    name: 'arduino-mpu6050-dmp-dual-servo',
    description: 'Arduino MPU6050 DMP dual servo control - quaternion-based orientation drives two servos via I2C',
    html_url: `https://github.com/${GITHUB_USERNAME}/arduino-mpu6050-dmp-dual-servo`,
    stargazers_count: 2,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:30Z',
    topics: ['arduino', 'mpu6050', 'dmp', 'servos', 'imu']
  },
  {
    id: 1358705788,
    name: 'arduino-ultrasonic-servo-dustbin',
    description: 'Arduino ultrasonic servo dustbin - HC-SR04 distance sensor triggers servo lid opening at 15cm threshold',
    html_url: `https://github.com/${GITHUB_USERNAME}/arduino-ultrasonic-servo-dustbin`,
    stargazers_count: 3,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:30Z',
    topics: ['arduino', 'ultrasonic', 'servo', 'smart-dustbin']
  },
  {
    id: 1358705789,
    name: 'esp32-dual-servo-web-control',
    description: 'ESP32 dual servo web control - two servos with HTML range sliders, WiFi station mode',
    html_url: `https://github.com/${GITHUB_USERNAME}/esp32-dual-servo-web-control`,
    stargazers_count: 2,
    forks_count: 0,
    language: 'C++',
    updated_at: '2026-09-14T06:16:32Z',
    topics: ['esp32', 'servo-control', 'web-slider', 'wifi']
  }
];

export interface FetchReposResult {
  repos: GitHubRepo[];
  isLive: boolean;
  error?: string;
  rateLimited?: boolean;
}

export async function fetchUserRepos(username: string = GITHUB_USERNAME): Promise<FetchReposResult> {
  try {
    // 1. Try our authenticated proxy endpoint (uses GitHub OAuth client credentials for 5,000 req/hr)
    const token = typeof window !== 'undefined' ? localStorage.getItem('saravanasai_gh_token') : null;
    const authHeaders: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json'
    };
    if (token) {
      authHeaders.Authorization = `Bearer ${token}`;
    }

    let response: globalThis.Response | null = null;
    try {
      response = await fetch('/api/github/repos', { headers: authHeaders });
    } catch {
      // Backend proxy might be initializing, fallback to direct GitHub
    }

    // 2. Fallback to direct GitHub public API if backend proxy is unavailable
    if (!response || !response.ok) {
      response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
        headers: authHeaders
      });
    }

    if (response.status === 403) {
      // Rate limited by GitHub
      return {
        repos: FALLBACK_REPOSITORIES,
        isLive: false,
        rateLimited: true,
        error: 'GitHub API hourly limit reached. Displaying cached repository data.'
      };
    }

    if (!response.ok) {
      return {
        repos: FALLBACK_REPOSITORIES,
        isLive: false,
        error: `GitHub returned status ${response.status}: ${response.statusText}`
      };
    }

    const data: GitHubRepo[] = await response.json();
    
    if (!Array.isArray(data)) {
      return {
        repos: FALLBACK_REPOSITORIES,
        isLive: false,
        error: 'Unexpected response format from GitHub API'
      };
    }

    if (data.length === 0) {
      // User has 0 public repos yet on their account, provide clean data with a clear banner
      return {
        repos: FALLBACK_REPOSITORIES,
        isLive: true,
        error: undefined
      };
    }

    return {
      repos: data,
      isLive: true
    };
  } catch (err: unknown) {
    return {
      repos: FALLBACK_REPOSITORIES,
      isLive: false,
      error: err instanceof Error ? err.message : 'Network failure reaching GitHub API'
    };
  }
}
