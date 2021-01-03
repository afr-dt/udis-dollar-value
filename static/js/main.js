function currencyFormat(params) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(params);
}

function changeDateFormat(date) {
  return date.toString().split('/').reverse().join('/');
}

function dateFormat(date) {
  return new Date(date).toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function capitalizeFirstLetter(text) {
  return text.replace(/(^.)/, (s) => s.toUpperCase());
}

function average(arr) {
  return arr.reduce((acc, el) => acc + el) / arr.length;
}

function max(arr) {
  return Math.max(...arr);
}

function min(arr) {
  return Math.min(...arr);
}

function valuesArray(params) {
  return params.datos.map((item) => item.dato).map(Number);
}

function get_dates(params) {
  return params.map((item) => item.fecha);
}

function get_currency_values(currency_arr) {
  return currency_arr.map((item) => item.dato).map(Number);
}

function series(values) {
  return `
      <ul class="list-group text-center list-group-flush">
      ${values
        .map((item) => {
          return ` 
          <li class="list-group-item">
            ${capitalizeFirstLetter(dateFormat(changeDateFormat(item.fecha)))}: 
            <strong>${currencyFormat(item.dato)}</strong> Pesos
          </li>
      `;
        })
        .join('')}
      </ul>
    `;
}

function chartData(currencies) {
  return currencies.data.map((item) => get_currency_values(item.datos));
}

function chartLabels(dates) {
  return dates.data.map((item) => get_dates(item.datos));
}

function dynamicBackgroundColors(data) {
  console.log(data.data);
}

function chartFuncBar(data) {
  dynamicBackgroundColors(data);
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels(data)[0],
      datasets: [
        {
          label: 'Valor en Pesos',
          data: chartData(data)[0],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Valores en Pesos',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function chartFuncBarT(data) {
  return new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: chartLabels(data)[1],
      datasets: [
        {
          label: 'Valor en Pesos',
          data: chartData(data)[1],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Valores en Pesos',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function renderTemplate(params) {
  return `
      <div class="col-sm-6">  
        <div class="card bg-light border-light shadow mb-3">
          <h5 class="card-header">
            ${
              params.idSerie === 'SP68257'
                ? 'Unidades de Inversión'
                : 'Tipo de Cambio'
            }
          </h5>
          <div class="card-body">
            <h5 class="card-title text-center">
              Promedio: ${currencyFormat(average(valuesArray(params)))}
              <br/>
              Valor máximo: ${currencyFormat(max(valuesArray(params)))}
              <br/>
              Valor mínimo: ${currencyFormat(min(valuesArray(params)))}
              <br/>
            </h5>
            <p class="card-text"></p>
            ${series(params.datos)}
          </div>    
        </div>  
      </div>  
    `;
}

function render(data) {
  if (data.status_code === 200) {
    return (document.getElementById('root').innerHTML = `
      <div class="row text-center">
        ${data.data.map(renderTemplate).join('')}
      </div>
    `);
  }
}
