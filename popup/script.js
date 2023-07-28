const conversions = {
  from_m: {
    to_km: .001,
    to_cm: 100,
    to_mm: 1000,
    to_in: 39.3701,
    to_yd: 1.09361,
    to_mi: 0.000621371,
  },
  from_km: {
    to_m: 1000,
    to_cm: 100000,
    to_mm: 1000000,
    to_in: 39370.1,
    to_yd: 1093.61,
    to_mi: .621371
  },
  from_mm: {
    to_m: .001,
    to_cm: .1,
    to_km: .000001,
    to_in: .0393701,
    to_yd: .00109361,
    to_mi: .000621371
  },
  from_cm: {
    to_mm: 10,
    to_m: .01,
    to_km: 0.00001,
    to_in: 0.393701,
    to_yd: 0.0109361,
    to_mi: .00000621504,
  },
  from_ft: {
    to_mm: 304.8,
    to_cm: 30.48,
    to_m: 0.3048,
    to_km: 0.0003048,
    to_in: 12,
    to_yd: 0.33,
    to_mi: 0.000189394,
  },
  from_in: {
    to_mm: 25.4,
    to_cm: 2.54,
    to_m: 0.0254,
    to_in: 1,
    to_km: 0.00002540005,
    to_yd: 0.0277778,
    to_mi: 0.00001578282,
  },
  from_yd: {
    to_mm: 914.4,
    to_cm: 91.44,
    to_m: .9144,
    to_km: 0.0009144,
    to_in: 36,
    to_mi: 0.000568182,
  },
  from_mi: {
    to_mm: 1609340,
    to_cm: 160934,
    to_m: 1609.34,
    to_km: 1.60934,
    to_yd: 1760,
    to_in: 63360,
  }
};

const allInputs = document.querySelectorAll("input");
allInputs.forEach((input) => {

  input.addEventListener("keypress", (e) => {

    const firstDotIndex = e.target.value.indexOf(".");
    const hasOnePeriod = firstDotIndex !== -1 && e.target.value.indexOf(".", firstDotIndex + 1) === -1;

    if (hasOnePeriod && e.key === '.') {
      e.preventDefault(); // if it already has one decimal point, the next period (".") should be ignored.
    } else {

      if (e.key === '.') {
        // continue the process as decimals can be entered.
      } else {
        if (/\d/.test(Number(e.key)) === false) {
          e.preventDefault();
        }
      }

    }

  });

  input.addEventListener("input", (e) => {


    const inputUnit = e.target.classList[1];
    const takenValue = e.target.valueAsNumber; // not using this for converting.

    let inputValue = takenValue; // used for converting.

    // here, I need to check if the value is NaN, and also, if the feet is in some number, then inches should just be down to 0, not converting everything else.

    if (e.target.classList[1] === 'in' && Number.isNaN(inputValue) && document.querySelector(".ft").valueAsNumber > 0) {
      document.querySelector(".in").value = 0;
    } {

      if(Number.isNaN(inputValue)) inputValue = 0;

      const allOtherInputs = document.querySelectorAll(`input:not(.${inputUnit})`); // taking all the other unit inputs so it doesn't crash while trying to convert itself.

      allOtherInputs.forEach((unitInput) => {
        console.log(unitInput.classList[1]);
        if (unitInput.classList[1] !== 'ft') {
          unitInput.value = inputValue * conversions[`from_${inputUnit}`][`to_${unitInput.classList[1]}`]
        } else {
          let inches = Math.round(inputValue * conversions[`from_${inputUnit}`]["to_in"])
          const feet = Math.round(inches / 12);

          inches = inches % 12;
          console.log(feet, inches);

          document.querySelector(".ft").value = feet;
          document.querySelector('.in').value = inches;
        }
      });
    }
  });

});