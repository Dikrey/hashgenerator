//SELURUH FUNGSI DIBUAT OLEH RAIHAN_OFFICIAL0307 X VISUALCODEPO
 //CREATED BY: RAIHAN_OFFICIAL0307 X VISUALCODEPO
 // t.me/raihan_official0307
 //OPEN SOURCE DAN WAJIB CANTUMKAN NAMA PEMBUAT ASLI
document.addEventListener('DOMContentLoaded', function() {
            const inputText = document.getElementById('inputText');
            const generateBtn = document.getElementById('generateBtn');
            const decryptBtn = document.getElementById('decryptBtn');
            const clearBtn = document.getElementById('clearBtn');
            const hashResult = document.getElementById('hashResult');
            const copyHashBtn = document.getElementById('copyHashBtn');
            const hashMethodsContainer = document.getElementById('hashMethods');
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            const historyList = document.getElementById('historyList');
            const decryptResultContainer = document.getElementById('decryptResultContainer');
            const decryptResult = document.getElementById('decryptResult');
            const compareBtn = document.getElementById('compareBtn');
            const hashToCompare = document.getElementById('hashToCompare');
            const compareResult = document.getElementById('compareResult');
            const toast = document.getElementById('toast');
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = document.getElementById('themeIcon');

            
            const hashMethods = [
                { 
                    id: 'md5',
                    name: 'MD5',
                    description: '128-bit hash value',
                    icon: 'fa-fingerprint',
                    secure: false
                },
                { 
                    id: 'sha1',
                    name: 'SHA-1',
                    description: '160-bit hash value',
                    icon: 'fa-shield-alt',
                    secure: false
                },
                { 
                    id: 'sha224',
                    name: 'SHA-224',
                    description: '224-bit hash value',
                    icon: 'fa-barcode',
                    secure: true
                },
                { 
                    id: 'sha256',
                    name: 'SHA-256',
                    description: '256-bit hash value',
                    icon: 'fa-code',
                    secure: true
                },
                { 
                    id: 'sha384',
                    name: 'SHA-384',
                    description: '384-bit hash value',
                    icon: 'fa-lock',
                    secure: true
                },
                { 
                    id: 'sha512',
                    name: 'SHA-512',
                    description: '512-bit hash value',
                    icon: 'fa-user-secret',
                    secure: true
                },
                { 
                    id: 'sha3-224',
                    name: 'SHA3-224',
                    description: '224-bit hash value',
                    icon: 'fa-qrcode',
                    secure: true
                },
                { 
                    id: 'sha3-256',
                    name: 'SHA3-256',
                    description: '256-bit hash value',
                    icon: 'fa-barcode',
                    secure: true
                },
                { 
                    id: 'sha3-384',
                    name: 'SHA3-384',
                    description: '384-bit hash value',
                    icon: 'fa-lock',
                    secure: true
                },
                { 
                    id: 'sha3-512',
                    name: 'SHA3-512',
                    description: '512-bit hash value',
                    icon: 'fa-user-secret',
                    secure: true
                },
                { 
                    id: 'shake128',
                    name: 'SHAKE128',
                    description: '64-bit output',
                    icon: 'fa-random',
                    secure: true
                },
                { 
                    id: 'shake256',
                    name: 'SHAKE256',
                    description: '64-bit output',
                    icon: 'fa-random',
                    secure: true
                }
            ];
//SELURUH FUNGSI DIBUAT OLEH RAIHAN_OFFICIAL0307 X VISUALCODEPO
 //CREATED BY: RAIHAN_OFFICIAL0307 X VISUALCODEPO
 // t.me/raihan_official0307
 //OPEN SOURCE DAN WAJIB CANTUMKAN NAMA PEMBUAT ASLI
            
            let selectedMethod = 'sha256';
            let history = JSON.parse(localStorage.getItem('hashHistory')) || [];

          
            renderHashMethods();
            updateHistoryDisplay();
            setupEventListeners();
            checkThemePreference();

          
            function renderHashMethods() {
                hashMethodsContainer.innerHTML = '';
                hashMethods.forEach(method => {
                    const methodCard = document.createElement('div');
                    methodCard.className = `method-card ${method.id === selectedMethod ? 'selected' : ''}`;
                    methodCard.dataset.method = method.id;
                    methodCard.innerHTML = `
                        <div class="method-icon">
                            <i class="fas ${method.icon}"></i>
                        </div>
                        <h3 class="method-name">${method.name}</h3>
                        <p class="method-desc">${method.description}</p>
                        ${method.secure ? '<div class="method-badge" style="margin-top: 5px; font-size: 0.6rem; color: var(--secondary);">SECURE</div>' : ''}
                    `;
                    hashMethodsContainer.appendChild(methodCard);
                });
            }

            function setupEventListeners() {
                
                document.querySelectorAll('.method-card').forEach(card => {
                    card.addEventListener('click', function() {
                        selectedMethod = this.dataset.method;
                        document.querySelectorAll('.method-card').forEach(c => c.classList.remove('selected'));
                        this.classList.add('selected');
                    });
                });

              
                generateBtn.addEventListener('click', generateHash);

              
                decryptBtn.addEventListener('click', tryToDecrypt);

                
                clearBtn.addEventListener('click', clearAll);

                
                copyHashBtn.addEventListener('click', copyHashToClipboard);

              
                tabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        const tabId = this.dataset.tab;
                        switchTab(tabId);
                    });
                });

              
                compareBtn.addEventListener('click', compareHashes);

                
                themeToggle.addEventListener('click', toggleTheme);

              
                inputText.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && e.ctrlKey) {
                        generateHash();
                    }
                });
            }

            function generateHash() {
                const text = inputText.value.trim();
                if (!text) {
                    showToast('Please enter some text to hash', 'warning');
                    return;
                }

              
                const originalText = generateBtn.innerHTML;
                generateBtn.innerHTML = '<span class="loading"></span> Generating...';
                generateBtn.disabled = true;
 //SELURUH FUNGSI DIBUAT OLEH RAIHAN_OFFICIAL0307 X VISUALCODEPO
 //CREATED BY: RAIHAN_OFFICIAL0307 X VISUALCODEPO
 // t.me/raihan_official0307
 //OPEN SOURCE DAN WAJIB CANTUMKAN NAMA PEMBUAT ASLI
                
                setTimeout(() => {
                    let hash;
                    try {
                        switch (selectedMethod) {
                            case 'md5':
                                hash = CryptoJS.MD5(text).toString();
                                break;
                            case 'sha1':
                                hash = CryptoJS.SHA1(text).toString();
                                break;
                            case 'sha224':
                                hash = CryptoJS.SHA224(text).toString();
                                break;
                            case 'sha256':
                                hash = CryptoJS.SHA256(text).toString();
                                break;
                            case 'sha384':
                                hash = CryptoJS.SHA384(text).toString();
                                break;
                            case 'sha512':
                                hash = CryptoJS.SHA512(text).toString();
                                break;
                            case 'sha3-224':
                                hash = sha3_224(text);
                                break;
                            case 'sha3-256':
                                hash = sha3_256(text);
                                break;
                            case 'sha3-384':
                                hash = sha3_384(text);
                                break;
                            case 'sha3-512':
                                hash = sha3_512(text);
                                break;
                            case 'shake128':
                                hash = shake128(text, 64);
                                break;
                            case 'shake256':
                                hash = shake256(text, 64);
                                break;
                            default:
                                hash = 'Unsupported method';
                        }

                        hashResult.innerHTML = `<span>${hash}</span><button class="copy-btn" id="copyHashBtn"><i class="fas fa-copy"></i> Copy</button>`;
                        document.getElementById('copyHashBtn').addEventListener('click', copyHashToClipboard);

                
                        addToHistory(text, selectedMethod, hash);

                        showToast('Hash generated successfully!', 'success');
                    } catch (error) {
                        hashResult.innerHTML = `<span style="color: var(--danger)">Error: ${error.message}</span><button class="copy-btn" id="copyHashBtn"><i class="fas fa-copy"></i> Copy</button>`;
                        showToast('Error generating hash', 'error');
                        console.error(error);
                    }

                    // Reset cuy
                    generateBtn.innerHTML = originalText;
                    generateBtn.disabled = false;
                }, 100);
            }

            function tryToDecrypt() {
                const hash = inputText.value.trim();
                if (!hash) {
                    showToast('Please enter a hash to decrypt', 'warning');
                    return;
                }

                // tampilakn loading
                const originalText = decryptBtn.innerHTML;
                decryptBtn.innerHTML = '<span class="loading"></span> Decrypting...';
                decryptBtn.disabled = true;

                setTimeout(() => {
                    let found = false;
                  
                    for (const item of history) {
                        if (item.hash === hash) {
                            decryptResult.innerHTML = `<span>Possible original text found in history: <strong>${item.text}</strong><br>Method: ${item.method.toUpperCase()}</span>`;
                            decryptResultContainer.style.display = 'block';
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                      
                        const commonHashes = {
                            'd41d8cd98f00b204e9800998ecf8427e': 'Empty string (MD5)',
                            'da39a3ee5e6b4b0d3255bfef95601890afd80709': 'Empty string (SHA-1)',
                            'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': 'Empty string (SHA-256)',
                            'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e': 'Empty string (SHA-512)'
                        };

                        if (commonHashes[hash]) {
                            decryptResult.innerHTML = `<span>This is a known hash for: <strong>${commonHashes[hash]}</strong></span>`;
                            decryptResultContainer.style.display = 'block';
                            found = true;
                        } else {
                            decryptResult.innerHTML = `<span style="color: var(--danger)">Unable to decrypt. Cryptographic hashes are designed to be one-way functions.</span>`;
                            decryptResultContainer.style.display = 'block';
                        }
                    }

                    showToast(found ? 'Possible match found' : 'Decryption attempted (hashes are one-way)', 
                             found ? 'success' : 'info');

                    // Reset
                    decryptBtn.innerHTML = originalText;
                    decryptBtn.disabled = false;
                }, 500);
            }

            function clearAll() {
                inputText.value = '';
                hashResult.innerHTML = '<span>Your hash will appear here...</span><button class="copy-btn" id="copyHashBtn"><i class="fas fa-copy"></i> Copy</button>';
                document.getElementById('copyHashBtn').addEventListener('click', copyHashToClipboard);
                decryptResultContainer.style.display = 'none';
                hashToCompare.value = '';
                compareResult.textContent = '';
                showToast('Cleared all inputs', 'info');
            }

            function copyHashToClipboard() {
                const hashText = hashResult.querySelector('span').textContent;
                if (!hashText || hashText === 'Your hash will appear here...') {
                    showToast('No hash to copy', 'warning');
                    return;
                }

                navigator.clipboard.writeText(hashText).then(() => {
                    showToast('Hash copied to clipboard!', 'success');
                }).catch(err => {
                    showToast('Failed to copy hash', 'error');
                    console.error('Failed to copy:', err);
                });
            }

            function addToHistory(text, method, hash) {
            
                history.unshift({
                    text,
                    method,
                    hash,
                    timestamp: new Date().toISOString()
                });

              
                if (history.length > 20) {
                    history = history.slice(0, 20);
                }

                // simpan di localStorage bro
                localStorage.setItem('hashHistory', JSON.stringify(history));

          
                updateHistoryDisplay();
            }

            function updateHistoryDisplay() {
                if (history.length === 0) {
                    historyList.innerHTML = '<p style="color: var(--gray-dark); text-align: center; padding: 1rem;">No history yet. Generate some hashes!</p>';
                    return;
                }

                historyList.innerHTML = '';
                history.forEach((item, index) => {
                    const time = new Date(item.timestamp).toLocaleTimeString();
                    const date = new Date(item.timestamp).toLocaleDateString();
                    
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.innerHTML = `
                        <div class="history-method">${item.method.toUpperCase()} <span style="color: var(--gray); font-size: 0.8em;">#${index + 1}</span></div>
                        <div class="history-hash">${item.hash}</div>
                        <div class="history-time">${date} ${time}</div>
                    `;
                    historyItem.addEventListener('click', () => {
                        inputText.value = item.text;
                        selectedMethod = item.method;
                        renderHashMethods(); // Update selected method in UI
                        switchTab('result');
                        showToast('Loaded from history', 'info');
                    });
                    historyList.appendChild(historyItem);
                });
            }

            function switchTab(tabId) {
              
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.tab === tabId) {
                        tab.classList.add('active');
                    }
                });

            
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}-tab`) {
                        content.classList.add('active');
                    }
                });
            }

            function compareHashes() {
                const generatedHash = hashResult.querySelector('span')?.textContent || '';
                const compareHash = hashToCompare.value.trim();

                if (!generatedHash || generatedHash === 'Your hash will appear here...') {
                    showToast('Please generate a hash first', 'warning');
                    return;
                }

                if (!compareHash) {
                    showToast('Please enter a hash to compare', 'warning');
                    return;
                }

                
                if (generatedHash.toLowerCase() === compareHash.toLowerCase()) {
                    compareResult.innerHTML = '<span class="match"><i class="fas fa-check-circle"></i> Hashes match!</span>';
                    showToast('Hashes match!', 'success');
                } else {
                    compareResult.innerHTML = '<span class="no-match"><i class="fas fa-times-circle"></i> Hashes do not match</span>';
                    showToast('Hashes do not match', 'error');
                }
            }

            function showToast(message, type) {
                toast.textContent = message;
                toast.className = 'toast show';
                
                
                toast.classList.remove('success', 'error', 'warning', 'info');
                if (type) {
                    toast.classList.add(type);
                }

            
                setTimeout(() => {
                    toast.className = 'toast';
                }, 3000);
            }
 //SELURUH FUNGSI DIBUAT OLEH RAIHAN_OFFICIAL0307 X VISUALCODEPO
 //CREATED BY: RAIHAN_OFFICIAL0307 X VISUALCODEPO
 // t.me/raihan_official0307
 //OPEN SOURCE DAN WAJIB CANTUMKAN NAMA PEMBUAT ASLI
          
            function sha3_224(text) {
                return sha3_224(text);
            }

            function sha3_256(text) {
                return sha3_256(text);
            }

            function sha3_384(text) {
                return sha3_384(text);
            }

            function sha3_512(text) {
                return sha3_512(text);
            }

            function shake128(text, bits) {
                return sha3.shake128.update(text).hex(bits/8);
            }

            function shake256(text, bits) {
                return sha3.shake256.update(text).hex(bits/8);
            }

          
            function checkThemePreference() {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const savedTheme = localStorage.getItem('theme');
                
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    themeIcon.className = 'fas fa-sun';
                } else {
                    document.documentElement.classList.remove('dark');
                    themeIcon.className = 'fas fa-moon';
                }
            }

            function toggleTheme() {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                    themeIcon.className = 'fas fa-moon';
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                    themeIcon.className = 'fas fa-sun';
                }
            }
        });
 //SELURUH FUNGSI DIBUAT OLEH RAIHAN_OFFICIAL0307 X VISUALCODEPO
 //CREATED BY: RAIHAN_OFFICIAL0307 X VISUALCODEPO
 // t.me/raihan_official0307
 //OPEN SOURCE DAN WAJIB CANTUMKAN NAMA PEMBUAT ASLI
 
