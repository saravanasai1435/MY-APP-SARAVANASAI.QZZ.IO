import { Project } from '../types';

import teluguVoiceImg from '../assets/images/telugu_voice_assistant_1790224749547.jpg';
import marauderImg from '../assets/images/esp32_marauder_tool_1790224764407.jpg';
import gestureCarImg from '../assets/images/espnow_gesture_car_1790224776880.jpg';
import mediaPlayerImg from '../assets/images/esp32_media_player_1790224790848.jpg';
import gpsTrackerImg from '../assets/images/esp32_gps_tracker_1790224802983.jpg';
import camWhatsappImg from '../assets/images/esp32_cam_whatsapp_1790224815178.jpg';

export const ARCHIVED_PROJECTS: Project[] = [
  {
    id: 'telugu-ai-voice-assistant',
    name: 'Telugu AI Voice Assistant (ESP32)',
    category: 'ai',
    shortDescription: 'ESP32 voice-first cooking & smart assistant featuring Telugu STT/TTS, OpenRouter LLM, ST7735 color TFT display, and INMP441 I2S mic.',
    fullDescription: 'A regional voice-controlled embedded assistant built on the ESP32. It records real-time regional Telugu speech using an INMP441 digital MEMS microphone over I2S, streams audio packets to a cloud speech-to-text pipeline, queries an LLM model, synthesizes Telugu audio responses back through an I2S DAC amplifier speaker, and visualizes audio wave dynamics and cooking recipes on an ST7735 1.8" TFT color screen.',
    image: teluguVoiceImg,
    technologies: ['ESP32', 'INMP441 I2S Mic', 'MAX98357A DAC', 'ST7735 TFT', 'Telugu STT/TTS', 'OpenRouter LLM', 'FreeRTOS', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/telugu-ai-voice-assistant',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'ESP32 Dual-Core (240MHz, 520KB SRAM)',
      sensors: ['INMP441 Omnidirectional MEMS Microphone (I2S)'],
      actuators: ['MAX98357A I2S Class D 3W Amplifier + Speaker'],
      display: '1.8" ST7735 Color SPI TFT Display (128x160)',
      communication: ['High-speed Wi-Fi', 'I2S Audio Input & Output', 'SPI Display Bus'],
      powerSupply: '5V 2A Regulated USB-C with AMS1117 3.3V LDO'
    },
    pinoutSummary: [
      'I2S Mic: SCK -> GPIO 14, WS -> GPIO 15, SD -> GPIO 32',
      'I2S DAC: BCLK -> GPIO 26, LRC -> GPIO 25, DIN -> GPIO 22',
      'ST7735 TFT: CS -> GPIO 5, DC -> GPIO 2, RST -> GPIO 4, MOSI -> GPIO 23, SCLK -> GPIO 18'
    ],
    circuitHighlights: [
      'RingBuffer direct memory access (DMA) streaming for low-latency audio packetization',
      'Asynchronous background HTTP task for LLM token ingestion without UI freeze',
      'Web Serial Flasher portal integration for seamless firmware updates'
    ]
  },
  {
    id: 'esp32-marauder-wifi-bt-security-tool',
    name: 'ESP32 Marauder WiFi/BT Security Toolkit',
    category: 'microcontrollers',
    shortDescription: 'Hardware wireless security audit toolkit with packet analysis, beacon scanning, evil portal testing, external SMA antenna, and SD card PCAP logging.',
    fullDescription: 'A portable RF security assessment device engineered on the ESP32 platform. Capable of analyzing 802.11 b/g/n wireless traffic and Bluetooth Low Energy advertising frames in real time. Features a 2.8" color touch display rendering real-time spectrum analysis, micro SD card packet capture (PCAP) recording, GPS coordinate tag synchronization, and external high-gain SMA antenna.',
    image: marauderImg,
    technologies: ['ESP32', 'ILI9341 2.8" TFT', 'XPT2046 Touch', 'MicroSD SPI', 'SMA Antenna', 'Packet Sniffing', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/esp32-marauder-wifi-bt-security-tool',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'ESP32-WROOM-32 (240MHz)',
      sensors: ['RF Promiscuous Sniffer Subsystem', 'Optional NEO-6M GPS Module'],
      actuators: ['Vibration Alert Motor', 'Multi-color NeoPixel Status LED'],
      display: '2.8" ILI9341 SPI TFT Touchscreen (240x320) with XPT2046 Controller',
      communication: ['Hardware SPI (Display & SD Card)', 'UART Serial Terminal'],
      powerSupply: '3.7V 1500mAh LiPo Battery with TP4056 USB-C Charging Board'
    },
    pinoutSummary: [
      'TFT SPI: MOSI -> GPIO 23, MISO -> GPIO 19, CLK -> GPIO 18, CS -> GPIO 15, DC -> GPIO 2',
      'Touch Controller: T_CS -> GPIO 21, T_IRQ -> GPIO 25',
      'SD Card Module: SD_CS -> GPIO 4 (Shared HSPI bus)'
    ],
    circuitHighlights: [
      'Hardware promiscuous mode filtering for 802.11 probe requests and beacon beacons',
      'FAT32 SD card writer pipeline logging capture files for Wireshark inspection',
      'Custom handheld battery-powered enclosure design with antenna bypass'
    ]
  },
  {
    id: 'esp32-esp-now-gesture-car',
    name: 'ESP-NOW Gesture-Controlled Robot Car',
    category: 'robotics',
    shortDescription: 'Zero-latency gesture-driven mobile robot: MPU6050 DMP wearable transmitter sends yaw/pitch/roll over ESP-NOW to dual-motor L298N chassis.',
    fullDescription: 'A high-speed dual-microcontroller teleoperation system. A wearable motion glove equipped with an ESP32 and MPU6050 6-axis IMU reads wrist tilt angles calculated by onboard Digital Motion Processing (DMP). It transmits encrypted wireless control packets via connectionless ESP-NOW protocol (sub-5ms latency) to a receiving ESP32 driving two high-torque DC motors via an L298N H-bridge.',
    image: gestureCarImg,
    technologies: ['ESP32 (x2)', 'ESP-NOW Protocol', 'MPU6050 DMP', 'L298N H-Bridge', 'Robotics', 'I2C', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/esp32-esp-now-gesture-car',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: '2x ESP32-WROOM-32 (Glove Transmitter & Car Receiver)',
      sensors: ['MPU6050 6-Axis Accelerometer & Gyroscope with DMP'],
      actuators: ['2x TT High-Torque DC Gear Motors', 'L298N Dual H-Bridge Driver'],
      display: 'Telemetry Serial Monitor & Multi-state Status LEDs',
      communication: ['ESP-NOW 2.4GHz Peer-to-Peer Protocol (No Wi-Fi router needed)', 'I2C'],
      powerSupply: 'Transmitter: 3.7V LiPo; Robot: Dual 18650 (7.4V) with LM2596 Step-Down'
    },
    pinoutSummary: [
      'MPU6050 (Transmitter): SDA -> GPIO 21, SCL -> GPIO 22, INT -> GPIO 19',
      'Car Receiver to L298N: IN1 -> GPIO 12, IN2 -> GPIO 13, IN3 -> GPIO 14, IN4 -> GPIO 27',
      'PWM Speed Control: ENA -> GPIO 25, ENB -> GPIO 26'
    ],
    circuitHighlights: [
      'Direct peer-to-peer MAC-address binding with zero network latency overhead',
      'Quaternion DMP filtering removes gravitational drift from hand tilts',
      'Automatic failsafe stops motors immediately if transmitter heartbeat signal is lost'
    ]
  },
  {
    id: 'mini-esp32-video-media-player',
    name: 'ESP32-S3 Mini Video & Audio Media Player',
    category: 'microcontrollers',
    shortDescription: 'Pocket multimedia player running on ESP32-S3 (16MB Flash) decoding MJPEG/AVI video and audio from MicroSD card onto SPI color TFT display.',
    fullDescription: 'An embedded media player pushing the computation boundaries of the ESP32-S3 microcontroller. Leveraging hardware SIMD vector instructions, it reads video frames and PCM audio buffers directly from a high-speed SPI MicroSD card, performs fast software frame decoding, and renders smooth fluid playback on an SPI TFT screen with synchronized audio output.',
    image: mediaPlayerImg,
    technologies: ['ESP32-S3 (16MB)', 'MicroSD Card SPI', 'ST7789 / ILI9341 TFT', 'PCM Audio', 'SIMD Decoding', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/mini-esp32-video-media-player',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'ESP32-S3 Dual-Core (16MB Flash, 8MB PSRAM)',
      sensors: ['4x Tactile Navigation Buttons (Play, Pause, Next, Volume)'],
      actuators: ['Miniature 8Ω 1W Speaker via DAC / I2S Amplifier'],
      display: '2.4" SPI TFT LCD (240x320, ST7789 or ILI9341)',
      communication: ['High-speed 40MHz SPI Display Bus', 'SPI MicroSD Bus'],
      powerSupply: '3.7V 600mAh LiPo Battery with USB-C Charging & Protection IC'
    },
    pinoutSummary: [
      'TFT SPI: MOSI -> GPIO 11, SCLK -> GPIO 12, CS -> GPIO 10, DC -> GPIO 9, RST -> GPIO 8',
      'SD Card SPI: MISO -> GPIO 13, MOSI -> GPIO 11, CLK -> GPIO 12, CS -> GPIO 14',
      'Audio DAC Output: GPIO 17 / I2S BCLK GPIO 15, LRC GPIO 16'
    ],
    circuitHighlights: [
      'Double frame buffering in PSRAM to eliminate tearing and visual stuttering',
      'Hardware timer interrupt for audio playback synchronization at 16kHz',
      'Compact handheld PCB/perfboard form factor'
    ]
  },
  {
    id: 'esp32-gps-tracker-cloud-upload',
    name: 'ESP32 GPS Telemetry Cloud Tracker',
    category: 'iot',
    shortDescription: 'Live location tracking node with NEO-6M GPS NMEA parsing, offline ring buffer, auto Wi-Fi reconnection, and CircuitDigest cloud telemetry.',
    fullDescription: 'An intelligent location and velocity tracker designed for assets and vehicles. Interfaced with a u-blox NEO-6M GPS receiver via hardware UART, it extracts latitude, longitude, altitude, speed, and timestamp coordinates using TinyGPS++. If Wi-Fi signal drops, it queues telemetry records into an offline SPIFFS flash buffer and automatically bulk-uploads to the cloud dashboard when back in range.',
    image: gpsTrackerImg,
    technologies: ['ESP32', 'NEO-6M GPS', 'NMEA Parsing', 'TinyGPS++', 'SPIFFS Storage', 'Cloud REST API', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/esp32-gps-tracker-cloud-upload',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'ESP32-WROOM-32',
      sensors: ['u-blox NEO-6M GPS Module with Ceramic Patch Antenna'],
      actuators: ['Status LEDs (Satellite Lock Blue, Cloud Sync Green)'],
      display: '0.96" I2C OLED (SSD1306) displaying Live Coordinates & Speed',
      communication: ['Hardware UART2 (Serial2: RX GPIO 16, TX GPIO 17)', 'I2C Bus', 'Wi-Fi 802.11'],
      powerSupply: '5V Car USB Adapter or 3.7V LiPo with 5V Boost Step-Up'
    },
    pinoutSummary: [
      'GPS Module: TX -> GPIO 16 (ESP32 RX2), RX -> GPIO 17 (ESP32 TX2), VCC -> 3.3V',
      'OLED Display: SDA -> GPIO 21, SCL -> GPIO 22',
      'Status LEDs: GPS Lock -> GPIO 2, Cloud Post -> GPIO 4'
    ],
    circuitHighlights: [
      'Non-blocking NMEA sentence parser handling 10Hz GPS location updates',
      'Offline failover buffer prevents data loss when travelling through cellular dead zones',
      'Ultra-low power deep sleep timer mode between coordinate transmission bursts'
    ]
  },
  {
    id: 'esp32-facedestect-whatsapp',
    name: 'ESP32-CAM Face Detection & WhatsApp Notifier',
    category: 'ai',
    shortDescription: 'Smart security camera with AI Thinker ESP32-CAM: runs onboard face detection and triggers instant WhatsApp image alerts via CallMeBot API.',
    fullDescription: 'An automated home security camera system. When the OV2640 camera registers a human face using ESP-WHO edge recognition neural models, the ESP32 captures a high-resolution snapshot, posts the image to an encrypted cloud repository, and triggers an immediate WhatsApp notification message with image preview to the owner via CallMeBot API.',
    image: camWhatsappImg,
    technologies: ['ESP32-CAM', 'OV2640 2MP', 'Face Detection', 'WhatsApp API', 'CallMeBot', 'HTTPS Client', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/esp32-facedestect-whatsapp',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'AI-Thinker ESP32-CAM (240MHz, 4MB PSRAM)',
      sensors: ['OmniVision OV2640 2-Megapixel Camera Lens'],
      actuators: ['High-Power White Flash LED (GPIO 4)', 'Active Security Buzzer'],
      display: 'Browser Config Portal & Remote Mobile WhatsApp Feed',
      communication: ['Wi-Fi 802.11 b/g/n (Station Mode)', 'HTTPS TLS 1.2 POST'],
      powerSupply: '5V 2A Stable DC Power Adapter'
    },
    pinoutSummary: [
      'Camera DVP Interface: Standard AI-Thinker internal bus',
      'High-Power Flashlight -> GPIO 4',
      'UART Programming: U0TXD -> GPIO 1, U0RXD -> GPIO 3 (IO0 pulled LOW for flashing)'
    ],
    circuitHighlights: [
      'On-device neural network face detection eliminating false alarms from shadows or pets',
      'TLS 1.2 encrypted HTTPS payload posting to WhatsApp messaging gateway',
      'Cooldown delay timer to prevent notification flooding'
    ]
  }
];
