document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    if (!bookingForm) return;

    // Pre-select treatment based on URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const treatmentParam = urlParams.get('treatment');
    if (treatmentParam) {
        const treatmentSelect = document.getElementById("treatment");
        if (treatmentSelect) {
            treatmentSelect.value = treatmentParam;
        }
    }

    const btnWhatsApp = document.getElementById("btnWhatsAppBook");
    const btnGmail = document.getElementById("btnGmailBook");

    // Click handler for WhatsApp booking
    btnWhatsApp.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = getFormData();
            sendWhatsApp(data);
        }
    });

    // Click handler for Gmail booking
    btnGmail.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = getFormData();
            sendGmail(data);
        }
    });

    // Form inputs validation
    function validateForm() {
        let isValid = true;
        const requiredInputs = bookingForm.querySelectorAll("[required]");
        
        requiredInputs.forEach(input => {
            const parent = input.parentElement;
            let errorMsg = parent.querySelector(".error-message");
            
            // Reset state
            input.style.borderColor = "";
            if (errorMsg) errorMsg.remove();

            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = "#d44638";
                
                // Append error message
                errorMsg = document.createElement("span");
                errorMsg.className = "error-message";
                errorMsg.style.color = "#d44638";
                errorMsg.style.fontSize = "0.75rem";
                errorMsg.style.marginTop = "4px";
                errorMsg.innerText = "This field is required";
                parent.appendChild(errorMsg);
            }
        });

        // Phone number validation
        const phoneInput = document.getElementById("phone");
        if (phoneInput && phoneInput.value) {
            const phoneVal = phoneInput.value.replace(/\D/g, "");
            if (phoneVal.length < 10) {
                isValid = false;
                phoneInput.style.borderColor = "#d44638";
                
                let errorMsg = phoneInput.parentElement.querySelector(".error-message");
                if (errorMsg) errorMsg.remove();
                
                errorMsg = document.createElement("span");
                errorMsg.className = "error-message";
                errorMsg.style.color = "#d44638";
                errorMsg.style.fontSize = "0.75rem";
                errorMsg.style.marginTop = "4px";
                errorMsg.innerText = "Please enter a valid 10-digit phone number";
                phoneInput.parentElement.appendChild(errorMsg);
            }
        }

        return isValid;
    }

    // Capture form values
    function getFormData() {
        return {
            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            treatment: document.getElementById("treatment").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            message: document.getElementById("message").value.trim()
        };
    }

    // Compose and redirect to WhatsApp
    function sendWhatsApp(data) {
        const phoneNum = "918088783348"; // India country code prefix
        const treatmentName = getTreatmentName(data.treatment);
        
        let text = `Hello Dentistry Alive Dental Clinic!\n`;
        text += `I would like to book a consultation appointment.\n\n`;
        text += `*My Details:*\n`;
        text += `• *Name:* ${data.name}\n`;
        text += `• *Contact:* ${data.phone}\n`;
        text += `• *Treatment:* ${treatmentName}\n`;
        text += `• *Date:* ${formatDate(data.date)}\n`;
        text += `• *Time:* ${data.time}\n`;
        
        if (data.message) {
            text += `• *Message:* ${data.message}\n`;
        }

        const encodedText = encodeURIComponent(text);
        const waUrl = `https://wa.me/${phoneNum}?text=${encodedText}`;
        
        window.open(waUrl, "_blank", "noopener,noreferrer");
        showSuccessMessage("WhatsApp Booking initialized! Opening WhatsApp...");
    }

    // Compose and redirect to Gmail via mailto link
    function sendGmail(data) {
        const emailReceiver = "dentistryaliveclinic@gmail.com";
        const treatmentName = getTreatmentName(data.treatment);
        const subject = encodeURIComponent(`Consultation Booking Request - ${data.name}`);
        
        let body = `Hello Dentistry Alive Dental Clinic,\n\n`;
        body += `I would like to request an appointment with the following details:\n\n`;
        body += `Name: ${data.name}\n`;
        body += `Contact Number: ${data.phone}\n`;
        body += `Requested Treatment: ${treatmentName}\n`;
        body += `Preferred Date: ${formatDate(data.date)}\n`;
        body += `Preferred Time Slot: ${data.time}\n`;
        
        if (data.message) {
            body += `Additional Notes/Symptoms: ${data.message}\n`;
        }

        const encodedBody = encodeURIComponent(body);
        const mailtoUrl = `mailto:${emailReceiver}?subject=${subject}&body=${encodedBody}`;
        
        window.open(mailtoUrl, "_blank");
        showSuccessMessage("Email Booking initialized! Opening Gmail / Mail app...");
    }

    // UI helper: Map value to friendly text
    function getTreatmentName(value) {
        const treatments = {
            "general": "General Dentistry (Checkups & Cleaning)",
            "root-canal": "Root Canal Therapy (RCT)",
            "implants": "Dental Implants & Crowns",
            "braces": "Orthodontics (Braces & Clear Aligners)",
            "cosmetic": "Cosmetic Dentistry (Whitening & Veneers)",
            "pediatric": "Pediatric (Kids) Dentistry",
            "other": "Other Dental Concern"
        };
        return treatments[value] || value;
    }

    // Date formatting helper: YYYY-MM-DD to DD-MM-YYYY
    function formatDate(dateStr) {
        if (!dateStr) return "";
        const parts = dateStr.split("-");
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    }

    // Show temporary success feedback on the page
    function showSuccessMessage(msgText) {
        let toast = document.querySelector(".booking-toast");
        if (toast) toast.remove();

        toast = document.createElement("div");
        toast.className = "booking-toast";
        toast.style.position = "fixed";
        toast.style.bottom = "100px";
        toast.style.right = "24px";
        toast.style.backgroundColor = "#2E1D16";
        toast.style.color = "#D4AF37";
        toast.style.padding = "16px 28px";
        toast.style.borderRadius = "12px";
        toast.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.25)";
        toast.style.border = "1px solid #D4AF37";
        toast.style.zIndex = "1000";
        toast.style.fontFamily = "var(--font-accent)";
        toast.style.fontWeight = "600";
        toast.style.animation = "fade-in-up 0.4s ease";
        toast.innerText = msgText;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
            toast.style.transition = "all 0.5s ease";
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
});
