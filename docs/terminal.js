// Terminal Portfolio - Interactive Command Handler
// Handles all terminal commands and navigation interactions

const terminalContent = document.getElementById('terminalContent');
const terminalInput = document.getElementById('terminalInput');
const navLinks = document.querySelectorAll('.nav-link');
const datetimeElement = document.getElementById('datetime');

// Update datetime on load and every second
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    datetimeElement.textContent = now.toLocaleString('en-US', options);
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Command responses data
const commands = {
    help: {
        description: 'Show available commands',
        output: () => `
Available commands:

  about        - Short summary of who I am
  projects     - SmartSchema, CedarStreet, and other key projects
  experience   - Cooperative Bank of Oromia, UBC MDS Capstone, Phinder Technologies
  education    - UBC MDS, Addis Ababa University BSc
  skills       - Key stack areas: backend, data engineering, ML, cloud, frontend, visualization
  contact      - Email and social links
  help         - Show this help message
  clear        - Clear the terminal

Type any command above or click the navigation links at the top.
        `.trim()
    },

    welcome: {
        description: 'Welcome message',
        output: () => `
Hi, I’m Elshaday Tamire Yoseph, a software engineer and data engineer based in Vancouver, BC, Canada.

Welcome to my interactive portfolio.

Type \`help\` to see available commands.
        `.trim()
    },

    about: {
        description: 'About me',
        output: () => `
I design and build production systems end to end. Backend services, data pipelines, and AI-powered components, grounded in strong computer science and data science foundations. I work across frontend, backend, and cloud infrastructure to deliver reliable, real-world systems.
        `.trim()
    },

    projects: {
        description: 'Key projects',
        output: () => `
▸ SmartSchema
  AI-powered data mapping & ingestion platform
    Tech: FastAPI + PostgreSQL + Next.js + AWS
    Link: https://smartschema.io
    Automated data schema mapping and intelligent data ingestion

▸ CedarStreet
  Full-stack analytics platform with embedded Power BI
    Link: https://cedarstreet.io
    Enterprise-grade analytics solution with real-time dashboards

▸ Wildfire Detection Pipeline
  Production-grade ML pipeline for wildfire detection
  Built for UBC MDS Capstone project with Bayes Studio
  End-to-end machine learning pipeline in production

▸ Additional Projects
  Various backend services, data pipelines, and ML models
  Focus on production-ready, scalable solutions
        `.trim()
    },

    experience: {
        description: 'Work experience',
        output: () => `
💼 Work Experience:

Software Engineer | Cooperative Bank of Oromia (Jan 2022 – Jul 2024)
- Built ETL workflows using Python and SQL to migrate customer, loan, and transaction data into a new ERP system.
- Developed backend services using Java Spring Boot and PostgreSQL supporting mobile and web banking.
- Built a Flutter-based financial mobile app with a backend connected to the core banking system.
- Worked with Temenos Transact/Infinity and WSO2 middleware to integrate internal tools with third-party APIs.
- Automated processes on Linux servers to improve reliability of data delivery.

Capstone Project – Data Engineer | University of British Columbia (Apr 2025 – Jun 2025)
- Built an end-to-end automated pipeline for wildfire detection using large labeled and unlabeled image datasets.
- Designed workflows for data ingestion, preprocessing, labeling, model training, distillation, and quantization.
- Delivered inference results via REST APIs to support downstream analytics.

Co-Founder & Project Manager | Phinder Technologies PLC (Oct 2023 – Jul 2024)
- Led and coordinated development activities for cloud-based financial and analytics platforms.
- Designed and deployed a multi-tenant SaaS backend on AWS using Java and PostgreSQL.
- Oversaw CI/CD pipelines and containerized deployments.
- Coordinated development efforts for cloud-based financial and analytics platforms.
Type 'projects' to see my recent work.
        `.trim()
    },

    education: {
        description: 'Education',
        output: () => `
🎓 Education:

MDS | Master of Data Science | University of British Columbia (Vancouver, Canada) (Sep 2024 – Nov 2025)
GPA: A

Key Topics:
- Data Engineering
- Cloud Computing
- Databases
- Statistical Inference
- Machine Learning
- Large Language Models
- Data Visualization
- Reproducible and Maintainable Code

BSc | BSc Computer Science | Addis Ababa University (Addis Ababa, Ethiopia) (Sep 2017 – Oct 2021)
GPA: 3.92/4

Key Topics:
- Software Engineering
- Data Structures and Algorithms
- Database Systems
- Operating Systems
- System Design
- Object-Oriented Programming
                `.trim()
    },

    skills: {
        description: 'Technical skills',
        output: () => `
Backend Development:
  • Python, FastAPI, Django
  • Java + Spring Boot
  • REST APIs, microservices architecture

Data & Machine Learning:
  • SQL, database design
  • Airflow, ETL pipelines
  • ML in production, model deployment
  • Data pipeline architecture

Cloud & Infrastructure:
  • AWS (EC2, S3, Lambda, RDS, etc.)
  • Docker, containerization
  • CI/CD pipelines
  • Infrastructure as code

Frontend & Visualization:
  • React, Next.js
  • Power BI, embedded analytics
  • Dash, Shiny
  • Data visualization
        `.trim()
    },

    contact: {
        description: 'Contact information',
        output: () => `
Email: elshadayrn13@gmail.com

Links:
  • LinkedIn: https://www.linkedin.com/in/elshaday-tamire-yoseph
  • GitHub: https://github.com/elshaday-tamire

Feel free to reach out for collaborations, opportunities, or just to connect!
        `.trim()
    },

    clear: {
        description: 'Clear terminal',
        output: () => ''
    }
};

// Add command to terminal history
function addCommandToHistory(command) {
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `
        <span class="prompt">elshaday@portfolio:~$</span>
        <span class="command-text">${command}</span>
    `;
    terminalContent.appendChild(commandLine);
}

// Type text with animation
function typeText(element, text, speed = 15, callback = null) {
    let index = 0;
    let currentText = '';
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            // Escape HTML for display, but we'll convert links after typing
            element.textContent = currentText;
            index++;
            // Scroll to bottom as we type
            terminalContent.scrollTop = terminalContent.scrollHeight;
        } else {
            clearInterval(typingInterval);
            if (callback) callback(currentText);
        }
    }, speed);
}

// Convert plain text to HTML with links
function formatTextWithLinks(text) {
    // Convert URLs to links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    // Convert email to mailto link
    text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, '<a href="mailto:$1">$1</a>');
    return text;
}

// Add output to terminal with typing animation
function addOutput(output) {
    if (output.trim() === '') {
        // Clear command - remove all content
        terminalContent.innerHTML = '';
        return;
    }

    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';
    terminalContent.appendChild(outputDiv);
    
    const lines = output.split('\n');
    let lineIndex = 0;
    const typedLines = [];
    
    function typeNextLine() {
        if (lineIndex >= lines.length) {
            // All lines typed, convert links in all paragraphs
            const paragraphs = outputDiv.querySelectorAll('p');
            paragraphs.forEach((para, idx) => {
                if (typedLines[idx]) {
                    para.innerHTML = formatTextWithLinks(typedLines[idx]);
                }
            });
            terminalContent.scrollTop = terminalContent.scrollHeight;
            return;
        }
        
        const line = lines[lineIndex];
        const para = document.createElement('p');

        // If the line contains a URL, color it with the prompt/current-dir color
        // while it's being typed so animated text matches the final link color.
        const urlRegex = /(https?:\/\/[^\s]+)/i;
        if (line.trim().startsWith('▸') || line.trim().startsWith('•')) {
            para.style.marginLeft = '0';
        }

        if (line.trim() === '') {
            para.innerHTML = '&nbsp;';
            outputDiv.appendChild(para);
            typedLines.push('');
            lineIndex++;
            setTimeout(typeNextLine, 50);
            return;
        }

        const urlMatch = urlRegex.exec(line);
        if (urlMatch) {
            // Split line into before / url / after so we can style "Website:" white
            // and the URL as an underlined link while typing.
            const url = urlMatch[0];
            const before = line.slice(0, urlMatch.index);
            const after = line.slice(urlMatch.index + url.length);

            outputDiv.appendChild(para);
            const spanBefore = document.createElement('span');
            const linkEl = document.createElement('a');
            linkEl.href = url;
            linkEl.target = '_blank';
            linkEl.rel = 'noopener noreferrer';
            // anchor text will be typed into the link element
            const spanAfter = document.createElement('span');

            para.appendChild(spanBefore);
            para.appendChild(linkEl);
            if (after) para.appendChild(spanAfter);

            // Type before, then link, then after (if any)
            typeText(spanBefore, before, 15, () => {
                typeText(linkEl, url, 15, () => {
                    if (after) {
                        typeText(spanAfter, after, 15, () => {
                            // push empty so final conversion doesn't overwrite our anchor
                            typedLines.push('');
                            lineIndex++;
                            setTimeout(typeNextLine, 80);
                        });
                    } else {
                        typedLines.push('');
                        lineIndex++;
                        setTimeout(typeNextLine, 80);
                    }
                });
            });
        } else {
            outputDiv.appendChild(para);
            // Type the line character by character
            typeText(para, line, 15, (typedText) => {
                typedLines.push(typedText);
                lineIndex++;
                // Small delay between lines
                setTimeout(typeNextLine, 80);
            });
        }
    }
    
    // Start typing
    typeNextLine();
}

// Process command
function processCommand(command) {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === '') {
        return;
    }

    addCommandToHistory(cmd);

    if (commands[cmd]) {
        const output = commands[cmd].output();
        addOutput(output);
    } else {
        addOutput(`command not found: ${cmd}. type 'help' to see available commands.`);
    }
}

// Handle input from terminal
terminalInput.addEventListener('keydown', (e) => {
    // Tab completion: complete single match or show possible matches
    if (e.key === 'Tab') {
        e.preventDefault();
        const current = terminalInput.textContent.trim();
        const cmdList = Object.keys(commands);
        // include also nav link commands if any (they map to same commands)
        const matches = cmdList.filter(c => c.startsWith(current));
        if (matches.length === 1) {
            terminalInput.textContent = matches[0] + ' ';
            // move caret to end
            setCaretToEnd(terminalInput);
        } else if (matches.length > 1) {
            // show possible completions in the terminal output
            addOutput(`Possible completions:\n\n${matches.map(m => `  ${m}`).join('\n')}`);
        }
        return;
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        const command = terminalInput.textContent.trim();
        terminalInput.textContent = '';
        processCommand(command);
    }
});

// Helper: move caret to end of a contenteditable element
function setCaretToEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

// Handle navigation link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const command = link.getAttribute('data-command');
        processCommand(command);
    });
});

// Focus input on load
window.addEventListener('load', () => {
    terminalInput.focus();
    // Trigger the welcome command on first load so it animates like other commands
    setTimeout(() => {
        processCommand('welcome');
    }, 200);
});

// Keep input focused when clicking in terminal
terminalContent.addEventListener('click', () => {
    terminalInput.focus();
});

// Prevent default paste behavior and handle it manually
terminalInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    terminalInput.textContent = text;
});

