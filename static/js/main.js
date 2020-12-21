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
  return new Date(date)
    .toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLowerCase();
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
      <ul class="list-group list-group-flush">
      ${values
        .map((item) => {
          return ` 
          <li class="list-group-item">
            El ${dateFormat(changeDateFormat(item.fecha))}: ${currencyFormat(
            item.dato
          )} Pesos
          </li>
      `;
        })
        .join('')}
      </ul>
    `;
}

function chartFuncBar(data) {
  currency = data.data.map((item) => get_currency_values(item.datos));
  labels = data.data.map((item) => get_dates(item.datos));
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels[0],
      datasets: [
        {
          label: 'Valor en Pesos',
          data: currency[0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
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
  currency = data.data.map((item) => get_currency_values(item.datos));
  labels = data.data.map((item) => get_dates(item.datos));
  return new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labels[1],
      datasets: [
        {
          label: 'Valor en Pesos',
          data: currency[1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
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
          <div class="card-header">
            ${
              params.idSerie === 'SP68257'
                ? 'Unidades de Inversión'
                : 'Tipo de Cambio'
            }
          </div>
          <div class="card-body">
            <div class="card-title">
              Promedio ${currencyFormat(average(valuesArray(params)))},
              Máximo ${currencyFormat(max(valuesArray(params)))},
              Mínimo ${currencyFormat(min(valuesArray(params)))}
            </div>
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
      <div class="row">
        ${data.data.map(renderTemplate).join('')}
      </div>
    `);
  }
}
