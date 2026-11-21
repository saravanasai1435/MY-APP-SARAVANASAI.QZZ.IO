import { TimelineEntry } from '../types';

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: 'Phase 01',
    title: 'Learning Electronics Fundamentals',
    phase: 'Core Foundations',
    description: 'Began exploring electronic circuits from the ground up: Ohm’s law, breadboard wiring, discrete components (resistors, capacitors, diodes, NPN/PNP transistors), reading schematics, and working with digital multimeters.',
    status: 'Completed',
    tags: ['Analog Electronics', 'Breadboarding', 'Circuit Laws', 'Soldering']
  },
  {
    year: 'Phase 02',
    title: 'Arduino Projects & Physical Computing',
    phase: 'Digital Prototyping',
    description: 'Transitioned from passive components to programmable logic with the ATmega328P. Built sensor networks, ultrasonic distance meters, servo motion controls, and interactive LCD/OLED feedback systems in C++.',
    status: 'Completed',
    tags: ['Arduino Uno', 'Digital/Analog I/O', 'PWM', 'C++', 'I2C/SPI']
  },
  {
    year: 'Phase 03',
    title: 'IoT Experiments & Connected Hardware',
    phase: 'Networked Telemetry',
    description: 'Broke out of isolated circuits into networked nodes. Interfaced ESP8266 and ESP32 with local Wi-Fi, built lightweight embedded HTTP servers, and synced sensor telemetry with cloud endpoints and web dashboards.',
    status: 'Completed',
    tags: ['ESP8266', 'Wi-Fi 802.11', 'HTTP REST', 'WebSockets', 'Sensor Cloud']
  },
  {
    year: 'Phase 04',
    title: 'ESP32 & Multi-Core Systems',
    phase: 'High-Performance MCU',
    description: 'Harnessed the dual-core 240MHz architecture of the ESP32 and ESP32-S3. Implemented FreeRTOS multi-threading, SPI TFT graphic displays, capacitive touch wake-ups, and optimized low-power deep sleep cycles.',
    status: 'Completed',
    tags: ['ESP32-S3', 'FreeRTOS Tasks', 'SPI TFT Display', 'Deep Sleep', 'BLE']
  },
  {
    year: 'Phase 05',
    title: 'AI + Hardware Synergy',
    phase: 'Edge Intelligence',
    description: 'Integrating edge sensors and microphones with AI models. Developed computer vision gesture control pipelines via Python/OpenCV, voice input interfaces using I2S MEMS microphones, and live AI data summaries on embedded screens.',
    status: 'Current Focus',
    tags: ['Edge AI', 'I2S Audio Pipeline', 'OpenCV Vision', 'LLM Integration', 'Python']
  },
  {
    year: 'Phase 06',
    title: 'Advanced Embedded Systems & Custom Hardware',
    phase: 'Engineering Rigor',
    description: 'Focusing on reliable architecture: hardware interrupt management, DMA memory channels, RTOS queue synchronization, power regulation, and drafting custom PCB layouts for long-term project enclosures.',
    status: 'Current Focus',
    tags: ['DMA Buffers', 'RTOS Queues', 'PCB Schematic Design', 'Hardware Watchdogs']
  },
  {
    year: 'Phase 07',
    title: 'Future Engineering Horizons',
    phase: 'Robotics & Automation',
    description: 'Aiming towards autonomous robotics systems, high-efficiency embedded edge inference, multi-node mesh networking, and building robust, practical open-source engineering tools that solve real-world problems.',
    status: 'Next Target',
    tags: ['Autonomous Robotics', 'Mesh Networks', 'Edge TPU/NPU', 'Practical Engineering']
  }
];
