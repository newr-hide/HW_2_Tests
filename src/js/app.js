// Алгоритм Луна
export const validateCardNumber = number => {
  let sum = 0;
  const reversedDigits = number.split('').map(Number).reverse();

  for (let i = 0; i < reversedDigits.length; i++) {
    let currentDigit = reversedDigits[i];

    if (i % 2 === 1) { 
      currentDigit *= 2;
      if (currentDigit > 9) currentDigit -= 9;
    }

    sum += currentDigit;
  }

  return sum % 10 === 0;
};

// Определяем платежную систему по номеру карты
export const determineCardType = number => {
  const bin = number.substring(0, 6); // Первые шесть цифр BIN
  switch (true) {
    case /^4/.test(bin):
      return 'Visa';
    case /^(51|52|53|54|55)/.test(bin):
      return 'Mastercard';
    case /^34|37/.test(bin):
      return 'American Express';
    case /^2200|2201|2202|2203|2204|2205|2206|2207|2208|2209|221[0-9]|222[0-9]|223[0-9]|224[0-9]|225[0-9]|226[0-9]|227[0-9]|228[0-9]|229[0-9]|23[0-9]{2}|24[0-9]{2}|25[0-9]{2}|26[0-9]{2}|27[0-9]{2}|28[0-9]{2}|29[0-9]{2}/.test(bin):

      return 'Мир';
    case /^6011|^65/.test(bin):
      return 'Discover';
    case /^35/.test(bin):
      return 'JCB';
    default:
      console.log("NULL")
      return null; 
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById('cart-input');
  const submitButton = document.getElementById('card_submit');
  const resetButton = document.getElementById('input_reset');
  const cardListItems = document.querySelectorAll('.card_item');

  function highlightCard(cardType) {
    cardListItems.forEach(item => {
      item.classList.remove('position_img'); 
      item.classList.add('deactive'); 
    });
  
    const activeItem = Array.from(cardListItems).find(item => item.textContent.trim() === cardType);
    if (activeItem) {
      activeItem.classList.remove('deactive');     
    }
  }

  function clearHighlight() {
    cardListItems.forEach(item => item.classList.remove('deactive'));
  }

  submitButton.addEventListener('click', e => {
    e.preventDefault(); 
    const value = inputField.value.replace(/\s/g, '');
    
    if (!value || !validateCardNumber(value)) {
      alert('Неверный номер карты!');
      clearHighlight();
    } else {
      const cardType = determineCardType(value);
      if (cardType) {
        highlightCard(cardType);
        alert(`Карта ${cardType} успешно проверена.`);
      } else {
        alert('Тип карты неизвестен.');
        clearHighlight();
      }
    }
  });

  resetButton.addEventListener('click', () => {
    inputField.value = '';
    clearHighlight();
  });
});