document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // Very basic toggle for mobile - could be expanded to a full overlay
            alert('Mobile navigation would expand here. For this professional version, we prioritize desktop grid layouts.');
        });
    }

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Terminal Simulation
    const terminalBody = document.getElementById('terminal-body');
    const commands = [
        { cmd: 'terraform init', resp: 'Initializing modules...', delay: 1000 },
        { cmd: 'terraform apply -auto-approve', resp: 'Apply complete! Resources: 15 added.', delay: 1500 },
    ];

    let cmdIndex = 0;

    function runTerminal() {
        if (cmdIndex >= commands.length) {
            // Reset after a while
            setTimeout(() => {
                terminalBody.innerHTML = `
                    <div class="command-line"><span class="prompt">$</span> whoami</div>
                    <div class="response">satham_hussain</div>
                    <div class="command-line cursor-line"><span class="prompt">$</span> <span class="cursor">|</span></div>
                `;
                cmdIndex = 0;
                runTerminal();
            }, 5000);
            return;
        }

        const current = commands[cmdIndex];
        const cursorLine = document.querySelector('.cursor-line');

        // Remove cursor line temporarily
        if (cursorLine) cursorLine.remove();

        // Add command
        const cmdDiv = document.createElement('div');
        cmdDiv.className = 'command-line';
        cmdDiv.innerHTML = `<span class="prompt">$</span> ${current.cmd}`;
        terminalBody.appendChild(cmdDiv);

        // Add response after small delay
        setTimeout(() => {
            const respDiv = document.createElement('div');
            respDiv.className = 'response';
            respDiv.innerText = current.resp;
            terminalBody.appendChild(respDiv);

            // Add back the cursor line
            const nextCursor = document.createElement('div');
            nextCursor.className = 'command-line cursor-line';
            nextCursor.innerHTML = `<span class="prompt">$</span> <span class="cursor">|</span>`;
            terminalBody.appendChild(nextCursor);

            // Auto-scroll terminal
            terminalBody.scrollTop = terminalBody.scrollHeight;

            cmdIndex++;
            setTimeout(runTerminal, current.delay);
        }, 600);
    }

    // Start terminal after 2 seconds
    setTimeout(runTerminal, 2000);
});
