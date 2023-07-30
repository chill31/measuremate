const length_conversions = {
  m: {
    km: .001,
    cm: 100,
    mm: 1000,
    in: 39.3701,
    yd: 1.09361,
    mi: 0.000621371,
  },
  km: {
    m: 1000,
    cm: 100000,
    mm: 1000000,
    in: 39370.1,
    yd: 1093.61,
    mi: .621371
  },
  mm: {
    m: .001,
    cm: .1,
    km: .000001,
    in: .0393701,
    yd: .00109361,
    mi: .000621371
  },
  cm: {
    mm: 10,
    m: .01,
    km: 0.00001,
    in: 0.393701,
    yd: 0.0109361,
    mi: .00000621504,
  },
  ft: {
    mm: 304.8,
    cm: 30.48,
    m: 0.3048,
    km: 0.0003048,
    in: 1,
    ft: 1,
    yd: 0.33,
    mi: 0.000189394,
  },
  in: {
    mm: 25.4,
    cm: 2.54,
    m: 0.0254,
    in: 1,
    km: 0.00002540005,
    yd: 0.0277778,
    mi: 0.00001578282,
  },
  yd: {
    mm: 914.4,
    cm: 91.44,
    m: .9144,
    km: 0.0009144,
    in: 36,
    mi: 0.000568182,
  },
  mi: {
    mm: 1609340,
    cm: 160934,
    m: 1609.34,
    km: 1.60934,
    yd: 1760,
    in: 63360,
  }
};

const weight_conversions = {
  mg: {
    cg: 0.1,
    g: 0.001,
    kg: .000001,
    t: .000000001,
    oz: 0.00003527336,
    lb: 0.00000220458,
    ust: 1 / 9.072e+8,
    ukt: 1 / 1.016e+9,
    ct: 0.005
  },
  cg: {
    mg: 10,
    g: .01,
    kg: .00001,
    t: .00000001,
    oz: 0.0003527336,
    lb: 0.0000220458,
    ust: 9072000000,
    ukt: 10160000000,
    ct: .05,
  },
  g: {
    mg: 1000,
    cg: 100,
    kg: .001,
    t: 1e-6,
    oz: 0.035274,
    lb: 0.00220462,
    ust: 1 / 907200,
    ukt: 9.8421e-7,
    ct: 5
  },
  kg: {
    mg: 1000000,
    cg: 100000,
    g: 1000,
    t: .001,
    oz: 35.274,
    lb: 2.20462,
    ust: 1 / 907.2,
    ukt: 1 / 1016,
    ct: 5000
  },
  t: {
    mg: 1e+9,
    cg: 1e+8,
    g: 1e+6,
    kg: 1000,
    oz: 35274,
    lb: 2204.62,
    ust: 1.10231,
    ukt: 0.984207,
    ct: 5e+6
  },
  oz: {
    mg: 28350,
    cg: 2835,
    g: 28.35,
    kg: .0283495,
    t: 1 / 35270,
    lb: 0.0625,
    ust: 1 / 32000,
    ukt: 1 / 35840,
    ct: 141.7
  },
  lb: {
    mg: 453600,
    cg: 45360,
    g: 453.6,
    kg: 1 / 2.205,
    t: 1 / 2205,
    oz: 16,
    ust: 0.0005,
    ukt: 1 / 2240,
    ct: 2268
  },
  ust: {
    mg: 9.072e+8,
    cg: 9.072e+7,
    g: 907185,
    kg: 907.185,
    t: 1 / 1.102,
    oz: 32000,
    lb: 2000,
    ukt: 1 / 1.12,
    ct: 4.536e+6
  },
  ukt: {
    mg: 1.016e+9,
    cg: 1.016e+8,
    g: 1.016e+6,
    kg: 1016.05,
    t: 1.01605,
    oz: 35840,
    lb: 2240,
    ust: 1.12,
    ct: 5.08e+6
  },
  ct: {
    mg: 200,
    cg: 20,
    g: 0.2,
    kg: .0002,
    t: 2e-7,
    oz: 1 / 141.7,
    lb: 1 / 2268,
    ust: 2.2046e-7,
    ukt: 1.968392857336e-7,
  }
}

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

});

const lengthInputs = document.querySelectorAll("input.length-unit");
lengthInputs.forEach((input) => {

  input.addEventListener("input", (e) => {

    // the unit which will be converted to all the other units.
    const inputUnit = e.target.classList[1];
    const inputValue = e.target.valueAsNumber;

    // selecting 
    const allOtherInputs = document.querySelectorAll(`.length-unit:not(.${inputUnit})`);
    allOtherInputs.forEach((loopInput) => {

      if (loopInput.classList[1] === 'in') {
        let inches = inputValue * length_conversions[`${inputUnit}`]["in"];
        const feet = inches / 12;

        inches = feet % 12;

        document.querySelector('.ft').value = feet;
        document.querySelector('.in').value = inches;
      } else {
        loopInput.value = inputValue * length_conversions[`${inputUnit}`][`${loopInput.classList[1]}`];
      }
    })

  });

})

const weightInputs = document.querySelectorAll("input.weight-unit");
weightInputs.forEach((input) => {

  input.addEventListener("input", (e) => {

    // the unit which will be converted to all the other units.
    const inputUnit = e.target.classList[1];
    const inputValue = e.target.valueAsNumber;

    // selecting 
    const allOtherInputs = document.querySelectorAll(`.weight-unit:not(.${inputUnit})`);
    allOtherInputs.forEach((loopInput) => {

      loopInput.value = inputValue * weight_conversions[`${inputUnit}`][`${loopInput.classList[1]}`];

    })

  });

})