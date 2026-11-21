import { Project } from '../types';

import rfidImg from '../assets/images/rfid_doorlock_system_1790224079002.jpg';
import esp32CamImg from '../assets/images/esp32_cam_stream_1790224092756.jpg';
import obstacleAvoidImg from '../assets/images/obstacle_avoid_robot_1790224106621.jpg';
import esp32GamepadImg from '../assets/images/esp32_ble_gamepad_1790224120096.jpg';
import tftCalcImg from '../assets/images/tft_touch_calculator_1790224134843.jpg';
import esp32IotImg from '../assets/images/esp32_iot_webcontrol_1790224150174.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'arduino-rfid-doorlock-family',
    name: 'Arduino RFID Door Lock Family',
    category: 'automation',
    shortDescription: '10 Arduino RFID door lock variants: servo deadbolt, buzzer feedback, relay trigger, 16x2 I2C LCD, multi-card EEPROM database, and emergency button override.',
    fullDescription: 'A modular, high-security embedded access control suite developed on Arduino. Features 10 operational firmware configurations leveraging the MFRC522 13.56 MHz RFID reader over SPI. It supports EEPROM credential persistence for multi-card registration, active piezo alert signals, an I2C 16x2 character display showing access status, and an SG90/MG996R servo-actuated physical locking bolt with manual pushbutton bypass.',
    image: rfidImg,
    technologies: ['Arduino Uno', 'MFRC522 RFID', 'SG90 Servo', '16x2 I2C LCD', 'EEPROM Database', 'Piezo Buzzer', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/arduino-rfid-doorlock-family',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: true,
    hardware: {
      mcu: 'ATmega328P (Arduino Uno / Nano)',
      sensors: ['MFRC522 13.56 MHz RFID Reader Module', 'Pushbutton Override (Pin D2)'],
      actuators: ['TowerPro SG90 / MG996R Servo Motor (Lock Bolt)', 'Active Piezo Buzzer (Pin D8)', 'Dual Status LEDs (Green D7 / Red D6)'],
      display: '16x2 Character LCD with PCF8574 I2C Backpack',
      communication: ['Hardware SPI (RC522: SDA D10, SCK D13, MOSI D11, MISO D12)', 'I2C (SDA A4, SCL A5)'],
      powerSupply: 'Regulated 5V DC USB / External Bench Supply'
    },
    pinoutSummary: [
      'RC522 SPI: SS(SDA) -> D10, SCK -> D13, MOSI -> D11, MISO -> D12, RST -> D9',
      'Servo Signal -> Pin D3 (Timer2 PWM)',
      '16x2 LCD I2C: SDA -> Pin A4, SCL -> Pin A5',
      'Buzzer -> D8, Green LED -> D7, Red LED -> D6, Manual Button -> D2'
    ],
    circuitHighlights: [
      '10 distinct architecture implementations (Single Card, Master Card Add/Delete, Relay, Servo)',
      'Non-volatile EEPROM credential memory retains authorized tags across power cycles',
      'Debounced scan cycle and hardware interrupt override for emergency manual exit'
    ]
  },
  {
    id: 'esp32-cam-stream',
    name: 'ESP32-CAM MJPEG Video Streamer & Face Detection',
    category: 'ai',
    shortDescription: 'Wireless MJPEG real-time camera web server featuring AI facial detection algorithms, configurable resolutions, and high-speed Wi-Fi streaming.',
    fullDescription: 'Embedded video streaming node engineered using the AI-Thinker ESP32-CAM board. Integrates an Omnivision OV2640 2-megapixel image sensor, hardware JPEG encoder, and 4MB external PSRAM. Hosts an asynchronous HTTP streaming web server with dynamic resolution adjustment (QVGA, VGA, SVGA, UXGA), brightness/contrast tuning, and hardware accelerated face recognition and detection models.',
    image: esp32CamImg,
    technologies: ['ESP32-CAM', 'OV2640 Camera', 'MJPEG Streaming', 'Face Detection', 'Wi-Fi 802.11', 'HTTP Web Server', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/esp32-cam-stream',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: true,
    hardware: {
      mcu: 'ESP32-D0WD (240MHz Dual-Core, 520KB SRAM + 4MB PSRAM)',
      sensors: ['OmniVision OV2640 2MP Camera Sensor (DVP 8-bit interface)'],
      actuators: ['High-Power Onboard Flash LED (GPIO 4)', 'Status Red LED (GPIO 33)'],
      display: 'Browser-Based Real-Time Streaming Dashboard (HTML5 / WebSockets)',
      communication: ['Wi-Fi 802.11 b/g/n (Station & SoftAP)', 'FTDI UART Serial (U0TXD GPIO 1, U0RXD GPIO 3)'],
      powerSupply: '5V 2A Regulated Input via FTDI or External LDO'
    },
    pinoutSummary: [
      'Camera DVP Bus: D0-D7 -> GPIO 5, 18, 19, 21, 36, 39, 34, 35',
      'Camera Clock: XCLK -> GPIO 0, PCLK -> GPIO 22, VSYNC -> GPIO 25, HREF -> GPIO 23',
      'Camera SCCB (I2C): SIOD -> GPIO 26, SIOC -> GPIO 27, PWDN -> GPIO 32',
      'High-Power Flashlight LED -> GPIO 4'
    ],
    circuitHighlights: [
      'Dual-core allocation: Core 0 dedicated to camera capture/DMA, Core 1 handles network stack',
      'PSRAM multi-frame frame-buffer to sustain fluid 25+ FPS MJPEG stream',
      'Direct browser-controllable flash strobe and exposure adjustments'
    ]
  },
  {
    id: 'arduino-ultrasonic-obstacle-avoidance-car',
    name: 'Arduino Ultrasonic Obstacle Avoidance Car',
    category: 'robotics',
    shortDescription: 'Autonomous mobile robot platform with scanning ultrasonic sensor on an SG90 servo turret, L298N dual motor driver, and collision evasion logic.',
    fullDescription: 'An autonomous two-wheeled robotic vehicle powered by the ATmega328P Arduino Uno. Equipped with an HC-SR04 ultrasonic rangefinder mounted atop a 180-degree panning servo. While navigating, it continuously polls forward distances; upon detecting obstacles within 20cm, it halts, sweeps left and right to compute unobstructed trajectories, and steers the high-torque TT DC gear motors accordingly.',
    image: obstacleAvoidImg,
    technologies: ['Arduino Uno', 'HC-SR04 Ultrasonic', 'L298N Motor Driver', 'SG90 Sweep Servo', 'DC Gear Motors', 'Robotics', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/arduino-ultrasonic-obstacle-avoidance-car',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: true,
    hardware: {
      mcu: 'ATmega328P (Arduino Uno R3)',
      sensors: ['HC-SR04 Ultrasonic Transducer Module (2cm to 400cm range)'],
      actuators: ['TowerPro SG90 Pan Servo Motor', '2x TT Dual-Shaft DC Gear Motors', 'L298N Dual H-Bridge Driver Board'],
      display: 'Serial Telemetry & Acoustic Warning Buzzer',
      communication: ['Hardware PWM Motor Speed Control', 'Digital GPIO Triggers'],
      powerSupply: 'Dual 18650 7.4V Li-ion Battery with LM2596 5V Buck Regulator'
    },
    pinoutSummary: [
      'HC-SR04: Trig -> Pin A1, Echo -> Pin A2',
      'Servo Turret Signal -> Pin A0 (Analog pin configured as digital PWM)',
      'L298N Motor Driver: IN1 -> D6, IN2 -> D7, IN3 -> D8, IN4 -> D9, ENA -> D5, ENB -> D10',
      'Dual 18650 Battery Rail -> L298N 12V terminal, 5V out -> Arduino Vin'
    ],
    circuitHighlights: [
      'Independent logic and high-current motor power rails eliminating voltage dips',
      'Look-Ahead panning algorithm: compares Left vs Right free distance before making turn',
      'Smooth differential steering with PWM speed throttling on turns'
    ]
  },
  {
    id: 'esp32-ble-gamepad-steeringwheel',
    name: 'ESP32 BLE Gamepad Steering Wheel',
    category: 'microcontrollers',
    shortDescription: 'Low-latency Bluetooth Low Energy (BLE) HID racing wheel controller with 10k precision potentiometer steering and tactile brake/throttle buttons.',
    fullDescription: 'Custom wireless embedded gaming controller engineered on the ESP32. It emulates a standard Bluetooth Low Energy HID Gamepad. An analog 10k precision rotary potentiometer reads the steering wheel angle through an ultra-low-noise 12-bit ADC with deadzone calibration, while digital microswitches handle acceleration, braking, and gear shifters with zero detectable input lag on PC racing simulators.',
    image: esp32GamepadImg,
    technologies: ['ESP32', 'BLE HID Gamepad', 'Analog Potentiometer', 'Tactile Buttons', 'Bluetooth Low Energy', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/esp32-ble-gamepad-steeringwheel',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'ESP32-WROOM-32 Dual-Core Xtensa LX6',
      sensors: ['10kΩ Precision Linear Potentiometer (Steering Axis)', 'Internal Hall Effect Sensor'],
      actuators: ['Tactile Arcade Pushbuttons (Brake, Throttle, Gear Shifts)', 'Vibration Haptic Feedback Motor'],
      display: 'OLED / PC Gaming Telemetry Dashboard',
      communication: ['Bluetooth Low Energy (BLE) 4.2 HID Profile', 'USB Serial Diagnostic'],
      powerSupply: '3.7V 800mAh LiPo Battery with TP4056 USB-C Charger & Protection'
    },
    pinoutSummary: [
      'Steering Potentiometer Wiper -> GPIO 34 (ADC1_CH6 Low-Noise)',
      'Throttle Trigger -> GPIO 18 (Internal Pull-up)',
      'Brake Trigger -> GPIO 19 (Internal Pull-up)',
      'Left Paddle Shift -> GPIO 21, Right Paddle Shift -> GPIO 22'
    ],
    circuitHighlights: [
      'EMA (Exponential Moving Average) smoothing filter on 12-bit ADC values preventing jitter',
      'Configurable center deadband and linear sensitivity curve for precise simulation steering',
      'Ultra-low latency sub-15ms Bluetooth HID report transmission rate'
    ]
  },
  {
    id: 'arduino-tft-touch-calculator',
    name: 'Arduino 3.5" TFT Touch Screen Calculator',
    category: 'microcontrollers',
    shortDescription: 'Full-featured graphical touch calculator with MCUFRIEND 3.5" color TFT shield, 4x4 responsive button matrix, and advanced math operations.',
    fullDescription: 'An interactive embedded touch utility built with Arduino Uno/Mega and an MCUFRIEND 3.5-inch 320x480 color TFT LCD shield. The resistive touch digitizer is calibrated using four-point matrix coordinates. Features a custom GUI rendering a 4x4 grid of rounded tactile buttons, handling floating-point arithmetic (+, -, *, /), square root, exponents, and percentage calculation.',
    image: tftCalcImg,
    technologies: ['Arduino Uno/Mega', '3.5" TFT Touch Screen', 'MCUFRIEND ILI9486', 'Resistive Touch ADC', 'GUI Graphics', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/arduino-tft-touch-calculator',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'Arduino Mega 2560 / Uno R3',
      sensors: ['4-Wire Analog Resistive Touch Panel (XP, YP, XM, YM)'],
      actuators: ['Audio Click Feedback via Buzzer on Pin D12'],
      display: 'MCUFRIEND 3.5" Color TFT LCD Shield (320x480 resolution, ILI9486/ILI9488)',
      communication: ['8-Bit Parallel Display Bus (LCD_D0 - LCD_D7)', 'Analog Touch Digitizer'],
      powerSupply: 'Standard 5V USB Bus Supply'
    },
    pinoutSummary: [
      'Touch Panel XP -> Pin 8, XM -> Pin A2, YP -> Pin A3, YM -> Pin 9',
      'LCD Control: LCD_CS -> A3, LCD_CD(RS) -> A2, LCD_WR -> A1, LCD_RD -> A0, LCD_RESET -> Pin 10',
      'LCD Data: D0-D7 mapped directly across Arduino digital port pins'
    ],
    circuitHighlights: [
      'Coordinate mapping algorithm converts raw 10-bit ADC voltages into precise pixel hit-boxes',
      'Partial screen repainting routine prevents full-display flicker when digits are entered',
      'Memory-optimized fixed-point and floating point string formatting routines'
    ]
  },
  {
    id: 'esp32-dht11-rgb-relay-webcontrol',
    name: 'ESP32 Web Control: DHT11, RGB & Relay',
    category: 'iot',
    shortDescription: 'Web-controlled IoT dashboard reporting real-time DHT11 climate readings, 15-color RGB lighting picker, and 5V power relay toggle.',
    fullDescription: 'A multi-featured IoT home automation prototype built on the ESP32. Hosts an asynchronous web server rendering a sleek modern responsive control interface. Streams live temperature and humidity metrics polled from a DHT11 sensor to an I2C 16x2 LCD, allows interactive selection across 15 RGB LED color presets, and switches AC/DC electrical loads via an optocoupled 5V 10A relay.',
    image: esp32IotImg,
    technologies: ['ESP32', 'DHT11 Sensor', 'RGB LED', 'Relay Module', '16x2 I2C LCD', 'WebSockets / HTTP', 'C++'],
    status: 'Completed',
    githubUrl: 'https://github.com/saravanasai1435/esp32-dht11-rgb-relay-webcontrol',
    demoUrl: '#',
    youtubeId: 'UCbHVszbbhqVB_sAu9pKc9FQ',
    featured: false,
    hardware: {
      mcu: 'ESP32-WROOM-32 (240MHz Dual-Core)',
      sensors: ['DHT11 Digital Temperature & Humidity Sensor'],
      actuators: ['5V 10A Optocoupled Relay Module', 'Common-Cathode / WS2812 RGB LED'],
      display: '16x2 Character LCD with PCF8574 I2C Backpack',
      communication: ['Wi-Fi 802.11 b/g/n (Station Mode)', 'HTTP Web Server', 'I2C Bus (GPIO 21 SDA, GPIO 22 SCL)'],
      powerSupply: 'Regulated 5V 2A Power Adapter with Filter Capacitors'
    },
    pinoutSummary: [
      'DHT11 Data -> GPIO 4 (with 4.7kΩ pull-up resistor to 3.3V)',
      'Relay IN -> GPIO 27 (Active LOW trigger via optocoupler)',
      'RGB LED: Red -> GPIO 25, Green -> GPIO 26, Blue -> GPIO 33 (via 220Ω resistors)',
      '16x2 LCD I2C: SDA -> GPIO 21, SCL -> GPIO 22'
    ],
    circuitHighlights: [
      'AJAX asynchronous sensor polling updating web client without reloading webpage',
      'PWM hardware LEDC timer channels creating smooth 256-step color blending for RGB LED',
      'Flyback diode protection and galvanic optical isolation on the 5V relay circuit'
    ]
  }
];
