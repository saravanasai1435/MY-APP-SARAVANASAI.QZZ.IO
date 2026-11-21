import { SkillGroup, TechItem } from '../types';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Hardware',
    description: 'Physical computing, microcontrollers, sensor integration, and peripheral interfacing.',
    icon: 'Cpu',
    skills: [
      {
        name: 'Arduino (Uno / Nano / Mega)',
        levelTag: 'Core Platform',
        description: 'ATmega328P prototyping, timer interrupts, PWM motor driving, ADC sensor sampling.',
        protocols: ['UART', 'SPI', 'I2C', 'PWM', 'ADC'],
        badgeColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60'
      },
      {
        name: 'ESP32 & ESP32-S3',
        levelTag: 'Primary Workhorse',
        description: 'Dual-core Xtensa 240MHz, FreeRTOS multitasking, Wi-Fi web servers, BLE client/server.',
        protocols: ['Wi-Fi 802.11', 'BLE 5.0', 'FreeRTOS', 'I2S', 'DMA'],
        badgeColor: 'text-orange-400 bg-orange-950/40 border-orange-800/60'
      },
      {
        name: 'Raspberry Pi Pico',
        levelTag: 'RP2040 Architecture',
        description: 'Dual ARM Cortex-M0+ processing, PIO (Programmable I/O) state machines, MicroPython.',
        protocols: ['PIO', 'I2C', 'SPI', 'MicroPython'],
        badgeColor: 'text-rose-400 bg-rose-950/40 border-rose-800/60'
      },
      {
        name: 'Sensors & Interfacing',
        levelTag: 'Comprehensive',
        description: 'Ultrasonic (HC-SR04), IR Obstacle, DHT11/22, MPU6050 Gyro/Accelerometer, Liquid depth.',
        protocols: ['Analog', 'Digital GPIO', '1-Wire', 'I2C Bus'],
        badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
      },
      {
        name: 'RFID Modules (MFRC522)',
        levelTag: 'Security & Access',
        description: '13.56MHz contactless identification, MIFARE Classic tag reading, UID access control.',
        protocols: ['SPI Bus', '13.56 MHz', 'UID Verification'],
        badgeColor: 'text-sky-400 bg-sky-950/40 border-sky-800/60'
      },
      {
        name: 'Displays (OLED & TFT & LCD)',
        levelTag: 'Visual Output',
        description: 'SSD1306 128x64 OLED, ST7789 Color SPI TFT, PCF8574 I2C 16x2 Character Displays.',
        protocols: ['I2C SSD1306', 'High-Speed SPI', 'Bitmapped Graphics'],
        badgeColor: 'text-indigo-400 bg-indigo-950/40 border-indigo-800/60'
      },
      {
        name: 'Servos & Actuators',
        levelTag: 'Mechanical Control',
        description: 'SG90 9g micro servos, MG995 high-torque metal gear servos, duty-cycle timing.',
        protocols: ['50Hz PWM', 'Pulse Duration Control', 'Relay Switching'],
        badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-800/60'
      },
      {
        name: 'Motors & Drivers',
        levelTag: 'Power Electronics',
        description: 'L298N dual H-bridge motor drivers, DC gear motors, stepper pulse sequencing.',
        protocols: ['H-Bridge', 'PWM Speed Modulation', 'Flyback Diodes'],
        badgeColor: 'text-yellow-400 bg-yellow-950/40 border-yellow-800/60'
      }
    ]
  },
  {
    category: 'Software',
    description: 'Embedded firmware programming, host scripting, version control, and web interfaces.',
    icon: 'Code2',
    skills: [
      {
        name: 'C / C++',
        levelTag: 'Firmware Core',
        description: 'Direct register manipulation, memory management, pointers, Arduino C++ & ESP-IDF.',
        protocols: ['Pointers', 'Interrupt Handlers', 'Header Files', 'OOP'],
        badgeColor: 'text-blue-400 bg-blue-950/40 border-blue-800/60'
      },
      {
        name: 'Python',
        levelTag: 'Scripting & Vision',
        description: 'Hardware communication (PySerial), OpenCV computer vision pipelines, automation tools.',
        protocols: ['PySerial', 'OpenCV', 'REST Clients', 'NumPy'],
        badgeColor: 'text-yellow-400 bg-yellow-950/40 border-yellow-800/60'
      },
      {
        name: 'JavaScript / TypeScript',
        levelTag: 'Interface Development',
        description: 'Dashboard frontends, real-time UI states, WebSockets, sensor visualization.',
        protocols: ['Async/Await', 'DOM APIs', 'Typed Architectures'],
        badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-800/60'
      },
      {
        name: 'HTML & CSS',
        levelTag: 'Layout & Styling',
        description: 'Semantic markup, Tailwind CSS utility architecture, responsive engineering dashboards.',
        protocols: ['Flexbox / Grid', 'Responsive CSS', 'SVG Graphics'],
        badgeColor: 'text-orange-400 bg-orange-950/40 border-orange-800/60'
      },
      {
        name: 'Git & GitHub',
        levelTag: 'Version Control',
        description: 'Branching, commit hygiene, open-source project management, issue tracking.',
        protocols: ['Git CLI', 'GitHub Workflows', 'Releases'],
        badgeColor: 'text-purple-400 bg-purple-950/40 border-purple-800/60'
      }
    ]
  },
  {
    category: 'Technology',
    description: 'System paradigms, distributed networks, artificial intelligence, and physical automation.',
    icon: 'Layers',
    skills: [
      {
        name: 'Embedded Systems',
        levelTag: 'Specialization',
        description: 'Real-time microcontroller architecture, power conservation, watchdog timers, state machines.',
        protocols: ['Interrupts', 'Deep Sleep', 'Debounce Logic', 'EEPROM'],
        badgeColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60'
      },
      {
        name: 'Internet of Things (IoT)',
        levelTag: 'Connected Systems',
        description: 'HTTP client/servers, MQTT lightweight messaging brokers, telemetry endpoints, cloud sync.',
        protocols: ['MQTT', 'HTTP REST', 'WebSockets', 'JSON'],
        badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
      },
      {
        name: 'Artificial Intelligence & Edge AI',
        levelTag: 'Applied Machine Learning',
        description: 'Connecting embedded controllers to LLM endpoints, audio feature extraction, speech pipelines.',
        protocols: ['Gemini / LLM APIs', 'I2S Audio Pipeline', 'Prompt Engineering'],
        badgeColor: 'text-teal-400 bg-teal-950/40 border-teal-800/60'
      },
      {
        name: 'Automation Systems',
        levelTag: 'Practical Engineering',
        description: 'Autonomous closed-loop feedback, threshold detection, relay switching, fail-safe gates.',
        protocols: ['Closed-Loop Feedback', 'Hysteresis Logic', 'Opto-Isolation'],
        badgeColor: 'text-orange-400 bg-orange-950/40 border-orange-800/60'
      },
      {
        name: 'Networking & Protocols',
        levelTag: 'Hardware & Web Comm',
        description: 'Hardware communication buses (I2C, SPI, UART) and networking layers (TCP/IP, Wi-Fi 802.11).',
        protocols: ['TCP/IP', 'I2C Multi-Drop', 'SPI Full-Duplex', 'UART Serial'],
        badgeColor: 'text-sky-400 bg-sky-950/40 border-sky-800/60'
      },
      {
        name: 'Computer Vision',
        levelTag: 'Vision Sensing',
        description: 'Real-time camera frame processing, hand landmark estimation, gesture coordinate mapping.',
        protocols: ['OpenCV', 'Thresholding', 'Coordinate Normalization'],
        badgeColor: 'text-violet-400 bg-violet-950/40 border-violet-800/60'
      }
    ]
  }
];

export const TECH_STACK: TechItem[] = [
  { name: 'Arduino', category: 'Hardware', tag: 'Microcontroller Platform', description: 'ATmega core hardware prototyping' },
  { name: 'ESP32 / S3', category: 'Hardware', tag: 'Wi-Fi & BLE Dual-Core', description: '240MHz high performance wireless MCU' },
  { name: 'Raspberry Pi', category: 'Hardware', tag: 'RP2040 & SBCs', description: 'ARM computing and programmable I/O' },
  { name: 'Python', category: 'Language', tag: 'Scripting & Edge Vision', description: 'Serial interfacing and OpenCV logic' },
  { name: 'C / C++', category: 'Language', tag: 'Embedded Firmware', description: 'Low-level performance and hardware registers' },
  { name: 'JavaScript', category: 'Language', tag: 'Web UI & Node', description: 'Reactive dashboards and telemetry views' },
  { name: 'HTML & CSS', category: 'Language', tag: 'Web Engineering', description: 'Responsive layouts and Tailwind design' },
  { name: 'GitHub', category: 'Protocol & Tool', tag: 'VCS & Repositories', description: 'Open-source documentation and release flows' },
  { name: 'AI APIs', category: 'AI & Cloud', tag: 'LLM & Edge Inferencing', description: 'Voice assistance and generative telemetry' },
  { name: 'Firebase', category: 'AI & Cloud', tag: 'Realtime Cloud Datastores', description: 'IoT sensor logging and remote control state' },
  { name: 'REST APIs', category: 'Protocol & Tool', tag: 'Network Interfaces', description: 'HTTP payloads for weather, time & data sync' }
];
