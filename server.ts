import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23liPlf0tRKt04LObk';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '3fd9766ad0a375e8a781b5a127ab97a2f5585dda';

app.use(express.json());

// Initialize Google GenAI on server
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SARAVANASAI_KNOWLEDGE = `
You are the AI Assistant for Saravanasai's Portfolio website.
About Saravanasai:
- School student and passionate practical technology/hardware builder.
- Specializes in: Arduino, ESP32, ESP32-CAM, Raspberry Pi, Embedded Electronics, IoT, Robotics, BLE Gamepads, and Automation.
- Motto: "Building. Experimenting. Learning. Real working systems over just theoretical study."
- GitHub: https://github.com/saravanasai1435
- YouTube Channel: Electrotech with Saravanasai (https://www.youtube.com/channel/UCbHVszbbhqVB_sAu9pKc9FQ)
- Email: chundurusaravanasai34@gmail.com

Projects on Saravanasai's GitHub (https://github.com/saravanasai1435):
1. Arduino RFID Door Lock Family (repo: arduino-rfid-doorlock-family):
   - Description: 10 Arduino RFID door lock variants featuring MFRC522 card authentication, servo lock deadbolt, buzzer feedback, 16x2 I2C LCD, multi-card EEPROM database, and button override.
   - Microcontroller: Arduino Uno / Nano (ATmega328P)
   - Sensors: MFRC522 13.56 MHz RFID Reader, Pushbutton Override (Pin D2)
   - Actuators: SG90 / MG996R Servo Lock, Active Piezo Buzzer (Pin D8), Green/Red LEDs (Pins D7, D6)
   - Display: 16x2 Character LCD with PCF8574 I2C Backpack (SDA A4, SCL A5)
   - Wiring/Pinout: RC522 SPI: SS D10, SCK D13, MOSI D11, MISO D12, RST D9. Servo on Pin D3.

2. ESP32-CAM MJPEG Video Streamer & Face Detection (repo: esp32-cam-stream):
   - Description: Real-time MJPEG camera web server with onboard face detection using AI Thinker ESP32-CAM.
   - Microcontroller: ESP32-CAM AI Thinker (240MHz, 520KB SRAM + 4MB PSRAM)
   - Sensors: OmniVision OV2640 2MP Camera Sensor (DVP 8-bit bus)
   - Actuators: High-brightness Flash LED (GPIO 4), Red status LED (GPIO 33)
   - Communication: Wi-Fi 802.11 b/g/n, High-speed UART

3. Arduino Ultrasonic Obstacle Avoidance Car (repo: arduino-ultrasonic-obstacle-avoidance-car):
   - Description: Autonomous two-wheeled mobile robot with HC-SR04 ultrasonic distance sensor mounted on an SG90 scanning servo turret, L298N dual H-bridge motor driver, and collision evasion algorithm.
   - Microcontroller: Arduino Uno R3 (ATmega328P)
   - Sensors: HC-SR04 Ultrasonic Transducer (Trig A1, Echo A2)
   - Actuators: SG90 Sweep Servo (Pin A0), 2x TT DC Gear Motors, L298N Motor Driver (IN1-4: D6-D9, ENA D5, ENB D10)
   - Power: Dual 18650 7.4V Li-ion Battery pack

4. ESP32 BLE Gamepad Steering Wheel (repo: esp32-ble-gamepad-steeringwheel):
   - Description: Bluetooth Low Energy (BLE) HID racing wheel controller with 10k potentiometer for steering and arcade tactile buttons for gas/brake.
   - Microcontroller: ESP32-WROOM-32
   - Sensors: 10kΩ Precision Linear Potentiometer (GPIO 34 ADC1)
   - Actuators: Tactile Arcade Switches (Brake GPIO 18, Throttle GPIO 19, Shifters GPIO 21/22)
   - Communication: BLE 4.2 HID Gamepad (zero-latency wireless connection to PC games)

5. Arduino 3.5" TFT Touch Screen Calculator (repo: arduino-tft-touch-calculator):
   - Description: Interactive touchscreen calculator on Arduino Uno/Mega with MCUFRIEND 3.5" 320x480 color TFT LCD, 4x4 graphical touch button grid, arithmetic, square roots, and power calculations.
   - Microcontroller: Arduino Mega 2560 / Uno R3
   - Display: MCUFRIEND 3.5-inch Color TFT Shield (ILI9486, 320x480)
   - Sensors: 4-Wire Analog Resistive Touch Panel (XP D8, XM A2, YP A3, YM D9)

6. ESP32 Web Control: DHT11, RGB & Relay (repo: esp32-dht11-rgb-relay-webcontrol):
   - Description: Web-controlled IoT dashboard reporting real-time DHT11 climate readings, 15-color RGB lighting picker, 16x2 I2C LCD, and 5V appliance relay toggle.
   - Microcontroller: ESP32-WROOM-32
   - Sensors: DHT11 Temperature & Humidity Sensor (GPIO 4)
   - Actuators: 5V 10A Optocoupled Relay (GPIO 27), WS2812/Common-Cathode RGB LED (GPIO 25, 26, 33)
   - Display: 16x2 I2C LCD (SDA GPIO 21, SCL GPIO 22)

Archived Projects Showcase on Saravanasai's GitHub:
7. Telugu AI Voice Assistant (repo: telugu-ai-voice-assistant):
   - Description: Regional voice assistant with Telugu speech-to-text/text-to-speech, OpenRouter LLM, ST7735 1.8" TFT display, INMP441 I2S mic, and MAX98357A I2S DAC amplifier.
8. ESP32 Marauder WiFi/BT Security Toolkit (repo: esp32-marauder-wifi-bt-security-tool):
   - Description: Handheld wireless security analyzer tool with packet sniffing, beacon scanning, 2.8" color touch display, SMA antenna, and micro SD card PCAP recording.
9. ESP-NOW Gesture-Controlled Robot Car (repo: esp32-esp-now-gesture-car):
   - Description: Sub-5ms latency gesture glove teleoperation with MPU6050 DMP transmitter sending wireless tilt commands to an autonomous 2-motor robot chassis via ESP-NOW.
10. ESP32-S3 Mini Video & Audio Media Player (repo: mini-esp32-video-media-player):
   - Description: Portable multimedia device with ESP32-S3 (16MB Flash) decoding MJPEG/AVI video frames and PCM audio buffers from MicroSD onto an SPI color TFT display.
11. ESP32 GPS Telemetry Cloud Tracker (repo: esp32-gps-tracker-cloud-upload):
   - Description: Live vehicle and asset tracker parsing NEO-6M NMEA sentences, local SPIFFS offline buffer, auto Wi-Fi recovery, and CircuitDigest cloud sync.
12. ESP32-CAM Face Detection & WhatsApp Notifier (repo: esp32-facedestect-whatsapp):
   - Description: Edge AI security camera detecting human faces using neural models and triggering immediate WhatsApp snapshot alerts via CallMeBot API.

Other Notable Repositories on Saravanasai's GitHub:
- nrf-box-v2 (nRF24L01 wireless communication box with channel hopping)
- scienceday-automation-family (6 ESP32/ESP8266 science day home automation variants)
- rfid-cloud-logger-family (3 ESP32 RFID Google Sheets cloud logger variants)
- arduino-mpu6050-dmp-dual-servo (MPU6050 6-axis gyroscope dual servo orientation)
- arduino-ultrasonic-servo-dustbin (Touchless smart trash can lid opener)

Guidelines for response:
- Be concise, clear, and technically accurate.
- Give exact pin numbers, component names, and code tips from Saravanasai's real GitHub projects.
- Direct users to Saravanasai's GitHub: https://github.com/saravanasai1435 and YouTube: Electrotech with Saravanasai.
`;

// AI Assistant endpoint
app.post('/api/assistant/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (ai) {
      try {
        const chatPrompt = `User question: ${message}\n\nPlease answer the user based on the knowledge provided.`;
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: chatPrompt,
          config: {
            systemInstruction: SARAVANASAI_KNOWLEDGE,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'I am ready to help you explore Saravanasai’s projects and hardware components.';
        res.json({ reply });
        return;
      } catch (err: any) {
        console.error('Gemini API call failed, using intelligent fallback:', err?.message || err);
      }
    }

    // Intelligent fallback response if API key is not yet set or rate limited
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes('rfid') || lower.includes('doorlock') || lower.includes('lock') || lower.includes('door')) {
      reply = "Saravanasai's Arduino RFID Door Lock Family (repo: arduino-rfid-doorlock-family) features 10 security variants using an MFRC522 13.56MHz RFID reader (SPI: SS D10, SCK D13, MOSI D11, MISO D12), an SG90/MG996R servo lock bolt on PWM Pin D3, a 16x2 I2C LCD, EEPROM multi-card registration, buzzer alert on D8, and manual button override on D2! Check it out: https://github.com/saravanasai1435/arduino-rfid-doorlock-family";
    } else if (lower.includes('cam') || lower.includes('stream') || lower.includes('video') || lower.includes('face')) {
      reply = "The ESP32-CAM MJPEG Video Streamer & Face Detection (repo: esp32-cam-stream) is built on an AI-Thinker ESP32-CAM with OV2640 2MP sensor. It runs an asynchronous MJPEG streaming server with browser controls, dynamic resolution, and hardware face detection models: https://github.com/saravanasai1435/esp32-cam-stream";
    } else if (lower.includes('car') || lower.includes('obstacle') || lower.includes('robot') || lower.includes('avoidance')) {
      reply = "The Arduino Ultrasonic Obstacle Avoidance Car (repo: arduino-ultrasonic-obstacle-avoidance-car) uses an Arduino Uno, HC-SR04 ultrasonic distance sensor mounted on an SG90 sweep servo turret, L298N dual H-bridge motor driver, and TT gear motors. It sweeps left and right to compute obstacle-free trajectories: https://github.com/saravanasai1435/arduino-ultrasonic-obstacle-avoidance-car";
    } else if (lower.includes('gamepad') || lower.includes('wheel') || lower.includes('ble') || lower.includes('steering')) {
      reply = "The ESP32 BLE Gamepad Steering Wheel (repo: esp32-ble-gamepad-steeringwheel) is an embedded gaming controller running on ESP32 Bluetooth Low Energy HID. It features a 10k precision analog potentiometer on GPIO 34 (ADC1) for zero-latency steering and arcade microswitches for gas and brake: https://github.com/saravanasai1435/esp32-ble-gamepad-steeringwheel";
    } else if (lower.includes('calculator') || lower.includes('tft') || lower.includes('touch')) {
      reply = "The Arduino 3.5\" TFT Touch Screen Calculator (repo: arduino-tft-touch-calculator) uses an Arduino Uno/Mega with an MCUFRIEND 3.5-inch 320x480 color TFT shield and 4-wire resistive touch panel. It runs a custom 4x4 GUI for arithmetic, square root, and power calculations: https://github.com/saravanasai1435/arduino-tft-touch-calculator";
    } else if (lower.includes('dht11') || lower.includes('rgb') || lower.includes('relay') || lower.includes('iot')) {
      reply = "The ESP32 Web Control: DHT11, RGB & Relay (repo: esp32-dht11-rgb-relay-webcontrol) hosts an embedded HTTP IoT control panel displaying live DHT11 temperature/humidity on a 16x2 I2C LCD, a 15-color preset RGB LED picker, and optocoupled 5V relay toggle: https://github.com/saravanasai1435/esp32-dht11-rgb-relay-webcontrol";
    } else if (lower.includes('telugu') || lower.includes('voice assistant')) {
      reply = "The Telugu AI Voice Assistant (repo: telugu-ai-voice-assistant) is an ESP32 voice-first cooking assistant with regional Telugu speech-to-text and text-to-speech, OpenRouter LLM integration, ST7735 color TFT display, and INMP441 I2S microphone: https://github.com/saravanasai1435/telugu-ai-voice-assistant";
    } else if (lower.includes('marauder') || lower.includes('security') || lower.includes('packet')) {
      reply = "The ESP32 Marauder WiFi/BT Security Toolkit (repo: esp32-marauder-wifi-bt-security-tool) is a handheld wireless auditing tool featuring packet analysis, beacon scanning, 2.8\" color touch screen, SMA antenna, and micro SD card PCAP logging: https://github.com/saravanasai1435/esp32-marauder-wifi-bt-security-tool";
    } else if (lower.includes('gesture car') || lower.includes('esp-now') || lower.includes('espnow')) {
      reply = "The ESP-NOW Gesture-Controlled Robot Car (repo: esp32-esp-now-gesture-car) uses an MPU6050 6-axis gyroscope gesture glove transmitting tilt coordinates over connectionless ESP-NOW (sub-5ms latency) to drive a dual-motor L298N robot chassis: https://github.com/saravanasai1435/esp32-esp-now-gesture-car";
    } else if (lower.includes('gps') || lower.includes('tracker')) {
      reply = "The ESP32 GPS Telemetry Cloud Tracker (repo: esp32-gps-tracker-cloud-upload) interfaces with a u-blox NEO-6M GPS receiver, parses NMEA sentences via TinyGPS++, buffers data offline to SPIFFS flash, and syncs live telemetry coordinates to the cloud: https://github.com/saravanasai1435/esp32-gps-tracker-cloud-upload";
    } else if (lower.includes('media player') || lower.includes('video player')) {
      reply = "The ESP32-S3 Mini Video & Audio Media Player (repo: mini-esp32-video-media-player) uses an ESP32-S3 (16MB Flash) with SIMD acceleration to decode MJPEG video frames and PCM audio buffers directly from a MicroSD card onto an SPI color TFT screen: https://github.com/saravanasai1435/mini-esp32-video-media-player";
    } else if (lower.includes('component') || lower.includes('hardware') || lower.includes('file') || lower.includes('bom')) {
      reply = "Saravanasai's GitHub projects use real microcontrollers (Arduino Uno, Nano, ESP32, ESP32-CAM), sensors (MFRC522 RFID, HC-SR04 Ultrasonic, DHT11, MPU6050, 10k Potentiometers), displays (MCUFRIEND 3.5\" TFT, 16x2 I2C LCD), and actuators (SG90/MG996R Servos, L298N Drivers, TT Motors, Relays). Click any project card to inspect the full BOM and pinout wiring diagram!";
    } else if (lower.includes('who') || lower.includes('about') || lower.includes('saravana') || lower.includes('saravanasai')) {
      reply = "Saravanasai is a school student, practical technology builder, and embedded systems enthusiast focused on microcontrollers, electronics, robotics, IoT, and automation. He creates real working hardware prototypes rather than just studying theory!";
    } else if (lower.includes('youtube') || lower.includes('video') || lower.includes('channel')) {
      reply = "Saravanasai's channel is 'Electrotech with Saravanasai' (https://www.youtube.com/channel/UCbHVszbbhqVB_sAu9pKc9FQ) where he shares hardware demonstrations and microcontroller builds!";
    } else if (lower.includes('github') || lower.includes('code') || lower.includes('repo')) {
      reply = "You can view all of Saravanasai's 30+ open source hardware codebases and schematics at: https://github.com/saravanasai1435";
    } else {
      reply = `Hello! I am Saravanasai's AI Assistant. I can help you with:\n1. Explaining any of Saravanasai's real GitHub projects (Arduino RFID Door Lock, ESP32-CAM MJPEG Streamer, Ultrasonic Robot Car, BLE Gamepad Wheel, TFT Touch Calculator, DHT11 RGB Relay Web Server).\n2. Providing exact components, sensors, displays, and GPIO pinouts.\n3. Linking directly to his GitHub repositories (https://github.com/saravanasai1435).\n4. Checking his YouTube channel (Electrotech with Saravanasai).\nWhat would you like to build or explore?`;
    }

    res.json({ reply });
  } catch (error: any) {
    console.error('Error handling assistant request:', error);
    res.status(500).json({ error: 'Failed to process AI assistant request' });
  }
});

// ==========================================
// GitHub OAuth & Elevated API Integration
// ==========================================

// 1. Get OAuth authorization URL for popup
app.get('/api/auth/github/url', (req: Request, res: Response) => {
  const queryRedirect = req.query.redirect_uri as string | undefined;
  const appUrl = process.env.APP_URL ? `${process.env.APP_URL.replace(/\/$/, '')}/auth/callback` : '';
  const redirectUri = queryRedirect || appUrl || `http://localhost:${PORT}/auth/callback`;

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'read:user,public_repo',
    allow_signup: 'true',
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.json({
    url: authUrl,
    clientId: GITHUB_CLIENT_ID,
    redirectUri,
  });
});

// 2. OAuth Callback handler (compatible with popup postMessage pattern)
app.get(['/auth/callback', '/auth/callback/'], async (req: Request, res: Response) => {
  const { code, error, error_description } = req.query;

  if (error || !code) {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Authentication Error</title>
          <style>
            body { font-family: monospace; background: #080c14; color: #f87171; padding: 2rem; text-align: center; }
          </style>
        </head>
        <body>
          <h2>GitHub Auth Failed</h2>
          <p>${error_description || error || 'No authorization code provided'}</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: '${error || "Authentication failed"}' }, '*');
              setTimeout(() => window.close(), 1800);
            }
          </script>
        </body>
      </html>
    `);
    return;
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange token');
    }

    const accessToken = tokenData.access_token;

    // Fetch user details with the token
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Saravanasai-Portfolio',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    const sanitizedUser = JSON.stringify({
      id: userData.id,
      login: userData.login,
      name: userData.name || userData.login,
      avatar_url: userData.avatar_url,
      bio: userData.bio || '',
      public_repos: userData.public_repos || 0,
      html_url: userData.html_url,
    });

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Authentication Successful</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #080c14;
              color: #f1f5f9;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: #0e1626;
              border: 1px solid #1e293b;
              padding: 2.5rem;
              border-radius: 1rem;
              text-align: center;
              max-width: 420px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            }
            .avatar {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              border: 2px solid #06b6d4;
              margin-bottom: 1rem;
            }
            .spinner {
              width: 28px;
              height: 28px;
              border: 3px solid #1e293b;
              border-top-color: #06b6d4;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 1.25rem auto 0;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${userData.avatar_url || 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'}" alt="Avatar" class="avatar" />
            <h3 style="color: #38bdf8; margin: 0 0 0.5rem;">Authentication Successful</h3>
            <p style="color: #cbd5e1; margin: 0; font-size: 14px;">Connected as <strong>@${userData.login || 'User'}</strong></p>
            <div class="spinner"></div>
            <p style="font-size: 11px; color: #64748b; margin-top: 1rem; font-family: monospace;">Closing window and returning to portfolio...</p>
          </div>
          <script>
            const payload = {
              type: 'OAUTH_AUTH_SUCCESS',
              token: ${JSON.stringify(accessToken)},
              user: ${sanitizedUser}
            };
            if (window.opener) {
              window.opener.postMessage(payload, '*');
              setTimeout(() => {
                window.close();
              }, 600);
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error('Error exchanging GitHub token:', err);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Error</title></head>
        <body style="font-family: monospace; background: #080c14; color: #f87171; padding: 2rem; text-align: center;">
          <h3>OAuth Exchange Failed</h3>
          <p>${err.message || 'Unknown error'}</p>
        </body>
      </html>
    `);
  }
});

// 3. Current authenticated user profile
app.get('/api/auth/github/user', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'Saravanasai-Portfolio',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userRes.ok) {
      res.status(userRes.status).json({ error: 'Failed to fetch user from GitHub' });
      return;
    }

    const userData = await userRes.json();
    res.json({
      id: userData.id,
      login: userData.login,
      name: userData.name,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      public_repos: userData.public_repos,
      html_url: userData.html_url,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// 4. Elevated Repositories Fetching Proxy (elevates rate limits from 60 to 5,000 req/hr)
app.get('/api/github/repos', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const headers: Record<string, string> = {
      'User-Agent': 'Saravanasai-Portfolio',
      Accept: 'application/vnd.github.v3+json',
    };

    if (authHeader && authHeader.startsWith('Bearer ')) {
      headers.Authorization = authHeader;
    } else if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
      // Basic auth with Client credentials gives 5,000 req/hour for public GitHub API queries
      const basicAuth = Buffer.from(`${GITHUB_CLIENT_ID}:${GITHUB_CLIENT_SECRET}`).toString('base64');
      headers.Authorization = `Basic ${basicAuth}`;
    }

    const response = await fetch(
      'https://api.github.com/users/saravanasai1435/repos?sort=updated&per_page=30',
      { headers }
    );

    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining');
      res.status(response.status).json({
        error: `GitHub API returned ${response.status}`,
        rateLimited: remaining === '0',
      });
      return;
    }

    const repos = await response.json();
    res.json(repos);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch GitHub repositories' });
  }
});

// Serve frontend in development and production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
