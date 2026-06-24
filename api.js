// api.js - واجهة الاتصال بقاعدة بيانات Google Sheets (نسخة XHR)
const API_URL = "https://script.google.com/macros/s/AKfycbx0W0LtHmP_cAjlqTihsBitLPEOeSkfjqdoZEcucBbJ9uACuqx8qlbS7vJJkeUBFZB7BA/exec";

/**
 * إرسال طلب POST إلى Google Apps Script وإرجاع النتيجة
 * @param {Object} params - وسائط الطلب
 * @returns {Promise<Object>} بيانات الاستجابة
 */
function apiCall(params) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          resolve({ error: "استجابة غير صالحة من الخادم" });
        }
      }
    };
    
    xhr.onerror = function() {
      resolve({ error: "فشل الاتصال بالخادم" });
    };
    
    const formBody = new URLSearchParams(params).toString();
    xhr.send(formBody);
  });
}
