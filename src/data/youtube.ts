import { YouTubeVideo } from '../types';

export interface YouTubeChannelConfig {
  channelName: string;
  channelId: string;
  channelUrl: string;
  handle: string;
  description: string;
  bannerTitle: string;
  topics: string[];
  // If a YouTube Data API v3 key is provided in future, it can fetch dynamically.
  // Otherwise, videoItems below serves as the curated list of video IDs / tutorials.
  apiKeyEnvVarName: string;
  videoItems: YouTubeVideo[];
}

export const YOUTUBE_CONFIG: YouTubeChannelConfig = {
  channelName: 'Electrotech with Saravanasai',
  channelId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
  channelUrl: 'https://www.youtube.com/channel/UCbHVszbbhqVB_sAu9pKc9FQ',
  handle: '@ElectrotechWithSaravanasai',
  description: 'Hands-on hardware engineering, electronics experiments, microcontroller tutorials, and practical project builds. Covering Arduino, ESP32, Raspberry Pi Pico, robotics, IoT, and embedded automation.',
  bannerTitle: 'Engineering In Action • Practical Circuits & Code',
  topics: [
    'Arduino & ESP32 Builds',
    'Circuit Schematics & Soldering',
    'Sensors & Displays Interfacing',
    'IoT & Wireless Automation',
    'AI & Edge Hardware Projects'
  ],
  apiKeyEnvVarName: 'VITE_YOUTUBE_API_KEY',
  // Curated showcase videos matching Saravanasai's real projects & tutorials
  // Video IDs can easily be updated as new videos are uploaded to the channel
  videoItems: [
    {
      id: 'rfid-attendance-demo',
      title: 'RFID Attendance System using Arduino & OLED Display | Circuit & Code',
      description: 'Step-by-step breakdown of wiring the MFRC522 RFID reader with an Arduino and SSD1306 OLED display for automatic contactless student logging.',
      publishedAt: 'Recent Video',
      thumbnail: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=640&q=80',
      duration: 'Practical Build',
      tags: ['RFID', 'Arduino', 'OLED', 'Embedded C++'],
      isFeatured: true
    },
    {
      id: 'esp32-smart-display',
      title: 'ESP32 Smart Display & Wi-Fi Telemetry Dashboard | ST7789 TFT Tutorial',
      description: 'Interfacing a 2.4" SPI TFT LCD with ESP32 to render real-time weather and API metrics with non-blocking FreeRTOS tasks.',
      publishedAt: 'Practical Tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80',
      duration: 'Embedded Tutorial',
      tags: ['ESP32', 'TFT Display', 'Wi-Fi', 'FreeRTOS'],
      isFeatured: true
    },
    {
      id: 'automated-toll-gate',
      title: 'Automated Toll Gate System with IR Sensor & Servo Motor Control',
      description: 'Designing a closed-loop toll gate barrier with obstacle infrared sensing, servo PWM positioning, and traffic indicator signal lights.',
      publishedAt: 'Hardware Project',
      thumbnail: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=640&q=80',
      duration: 'Hardware Demo',
      tags: ['Servo Motor', 'IR Sensor', 'Automation', 'Arduino'],
      isFeatured: false
    },
    {
      id: 'water-level-controller',
      title: 'Automatic Water Level Controller & Ultrasonic Depth Indicator',
      description: 'Preventing tank overflows using ultrasonic distance measurement, 10-stage LED ladder indication, and optocoupler pump relay cut-off.',
      publishedAt: 'Engineering Build',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=640&q=80',
      duration: 'DIY Automation',
      tags: ['Sensors', 'Relays', 'Ultrasonic', 'Circuit Design'],
      isFeatured: false
    }
  ]
};
