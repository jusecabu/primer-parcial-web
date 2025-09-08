const factorInput = document.getElementById("factorInput");
const coefficients = {
    y1: [],
    y2: [],
    y3: [],
    y4: [],
    y5: [],
    y6: [],
    y7: [],
};
const mainTableValues = {
    // fill x from 0 to 360
    x: Array.from({ length: 361 }, (_, i) => i),
    y1: [],
    y2: [],
    y3: [],
    y4: [],
    y5: [],
    y6: [],
    y7: [],
    sumY: [],
};
const normalizedTableValues = {
    x: [],
    y: [],
};
const averageY01Values = {
    // fill xa from 0 to 0.9, step 0.1
    xa: Array.from({ length: 10 }, (_, i) => parseFloat((i * 0.1).toFixed(1))),
    xb: Array.from({ length: 10 }, (_, i) =>
        parseFloat((i * 0.1 + 0.1).toFixed(1))
    ),
    // fill xCenter with the calculated center of xa and xb
    xCenter: Array.from({ length: 10 }, (_, i) =>
        parseFloat(((i * 0.1 + (i * 0.1 + 0.1)) / 2).toFixed(2))
    ),
    yAverage: [],
};
const averageY005Values = {
    // fill xa from 0 to 0.95, step 0.05
    xa: Array.from({ length: 20 }, (_, i) => parseFloat((i * 0.05).toFixed(2))),
    xb: Array.from({ length: 20 }, (_, i) =>
        parseFloat((i * 0.05 + 0.05).toFixed(2))
    ),
    // fill xCenter with the calculated center of xa and xb
    xCenter: Array.from({ length: 20 }, (_, i) =>
        parseFloat(((i * 0.05 + (i * 0.05 + 0.05)) / 2).toFixed(3))
    ),
    yAverage: [],
};
const applyBtn = document.getElementById("applyBtn");
const coefficientTable = document.getElementById("coefficientTable");
const mainTable = document.getElementById("mainTable");
const maxAndMinTable = document.getElementById("maxAndMinTable");
const normalizedTable = document.getElementById("normalizedTable");
let normalizedChart;
const averageY01Table = document.getElementById("averageY01Table");
let averageY01Chart;
const averageY005Table = document.getElementById("averageY005Table");
let averageY005Chart;
let combinedCharts;

initialize();

console.log(averageY005Values);

applyBtn.addEventListener("click", () => {
    initialize();
});

function initialize() {
    calculateCoefficients();
    calculateMainTableValues();
    calculateNormalizedTableValues();
    calculateAverageY01Values();
    calculateAverageY005Values();
    renderCoefficientTable();
    renderMainTable();
    renderMaxAndMinTable();
    renderNormalizedTable();
    graphNormalizedY();
    renderAverageY01Table();
    graphAverageY01();
    renderAverageY005Table();
    graphAverageY005();
    graphCombined();
}

function graphCombined() {
    // combine normalizedY, averageY01Chart and averageY005Chart into one chart
    const canvas = document.getElementById("combinedCharts");
    const ctx = canvas.getContext("2d");
    if (combinedCharts) {
        combinedCharts.destroy();
    }
    combinedCharts = new Chart(ctx, {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Promedio Y, range 0.1",
                    data: averageY01Values.xCenter.map((x, i) => ({
                        x,
                        y: averageY01Values.yAverage[i],
                    })),
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    showLine: true,
                },
                {
                    label: "Promedio Y, range 0.05",
                    data: averageY005Values.xCenter.map((x, i) => ({
                        x,
                        y: averageY005Values.yAverage[i],
                    })),
                    borderColor: "rgba(192, 75, 75, 1)",
                    borderWidth: 1,
                    showLine: true,
                },
                {
                    label: "Normalized Y",
                    data: normalizedTableValues.x.map((x, i) => ({
                        x,
                        y: normalizedTableValues.y[i],
                    })),
                    borderColor: "rgba(75, 75, 192, 1)",
                    borderWidth: 1,
                    showLine: true,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: "linear", // importante para usar valores reales de X
                    title: {
                        display: true,
                        text: "X",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Y",
                    },
                },
            },
        },
    });
}

function graphAverageY005() {
    const canvas = document.getElementById("averageY005Chart");
    const ctx = canvas.getContext("2d");
    if (averageY005Chart) {
        averageY005Chart.destroy();
    }
    averageY005Chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: averageY005Values.xCenter,
            datasets: [
                {
                    label: "Promedio Y, range 0.05",
                    data: averageY005Values.yAverage,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    fill: false,
                },
            ],
        },
    });
}

function renderAverageY005Table() {
    averageY005Table.innerHTML = "";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    header.innerHTML =
        "<th>XA</th><th>XB</th><th>X Center</th><th>Average Y</th>";
    thead.appendChild(header);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    for (let i = 0; i < averageY005Values.xCenter.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${averageY005Values.xa[i]}</td><td>${averageY005Values.xb[i]}</td><td>${averageY005Values.xCenter[i]}</td><td>${averageY005Values.yAverage[i]}</td>`;
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    averageY005Table.appendChild(table);
}

function graphAverageY01() {
    const canvas = document.getElementById("averageY01Chart");
    const ctx = canvas.getContext("2d");
    if (averageY01Chart) {
        averageY01Chart.destroy();
    }
    averageY01Chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: averageY01Values.xCenter,
            datasets: [
                {
                    label: "Promedio Y, range 0.1",
                    data: averageY01Values.yAverage,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    fill: false,
                },
            ],
        },
    });
}

function renderAverageY01Table() {
    averageY01Table.innerHTML = "";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    header.innerHTML =
        "<th>XA</th><th>XB</th><th>X Center</th><th>Average Y</th>";
    thead.appendChild(header);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let i = 0; i < averageY01Values.xCenter.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${averageY01Values.xa[i]}</td><td>${averageY01Values.xb[i]}</td><td>${averageY01Values.xCenter[i]}</td><td>${averageY01Values.yAverage[i]}</td>`;
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    averageY01Table.appendChild(table);
}

function graphNormalizedY() {
    const canvas = document.getElementById("normalizedChart");
    const ctx = canvas.getContext("2d");
    if (normalizedChart) {
        normalizedChart.destroy();
    }
    normalizedChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: normalizedTableValues.x,
            datasets: [
                {
                    label: "Normalized Y",
                    data: normalizedTableValues.y,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    fill: false,
                },
            ],
        },
    });
}

function renderNormalizedTable() {
    normalizedTable.innerHTML = "";
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    header.innerHTML = "<th>Normalized X</th><th>Normalized Y</th>";
    thead.appendChild(header);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let i = 0; i < normalizedTableValues.x.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${normalizedTableValues.x[i].toFixed(
            6
        )}</td><td>${normalizedTableValues.y[i].toFixed(6)}</td>`;
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    normalizedTable.appendChild(table);
}

function renderMaxAndMinTable() {
    maxAndMinTable.innerHTML = "";
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    header.innerHTML =
        "<th>Min X</th><th>Max X</th><th>Min Y</th><th>Max Y</th>";
    thead.appendChild(header);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");
    const maxX = Math.max(...mainTableValues.x);
    const minX = Math.min(...mainTableValues.x);
    const maxY = Math.max(...mainTableValues.y1);
    const minY = Math.min(...mainTableValues.y1);
    row.innerHTML = `<td>${minX}</td><td>${maxX}</td><td>${minY.toFixed(
        6
    )}</td><td>${maxY.toFixed(6)}</td>`;
    tbody.appendChild(row);
    table.appendChild(tbody);
    maxAndMinTable.appendChild(table);
}

function renderMainTable() {
    mainTable.innerHTML = "";
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    header.innerHTML =
        "<th>X</th><th>Y1</th><th>Y2</th><th>Y3</th><th>Y4</th><th>Y5</th><th>Y6</th><th>Y7</th><th>Sumatoria Y</th>";
    thead.appendChild(header);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let i = 0; i < mainTableValues.x.length; i++) {
        const row = document.createElement("tr");
        const xValue = mainTableValues.x[i];
        row.innerHTML = `<td>${xValue}</td>`;
        for (let j = 1; j <= 7; j++) {
            const yValue = mainTableValues[`y${j}`][i];
            row.innerHTML += `<td>${yValue.toFixed(6)}</td>`;
        }
        const sumYValue = mainTableValues.sumY[i];
        row.innerHTML += `<td>${sumYValue.toFixed(6)}</td>`;
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    mainTable.appendChild(table);
}

function renderCoefficientTable() {
    coefficientTable.innerHTML = "";
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    header.innerHTML =
        "<th>Y1</th><th>Y2</th><th>Y3</th><th>Y4</th><th>Y5</th><th>Y6</th><th>Y7</th>";
    thead.appendChild(header);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    // make a row for each coefficient set, and 6 decimal places
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (const key in coefficients) {
            const cell = document.createElement("td");
            cell.textContent = coefficients[key][i].toFixed(6);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    coefficientTable.appendChild(table);
}

function calculateAverageY005Values() {
    // calculate the average of normalized y using averageIfs function
    averageY005Values.yAverage = averageY005Values.xCenter.map((_, i) =>
        parseFloat(
            averageIfs(
                normalizedTableValues.y,
                normalizedTableValues.x,
                (x) =>
                    x >= averageY005Values.xa[i] && x < averageY005Values.xb[i]
            ).toFixed(6)
        )
    );
}

function calculateAverageY01Values() {
    // calculate the average of normalized y using averageIfs function
    averageY01Values.yAverage = averageY01Values.xCenter.map((_, i) =>
        parseFloat(
            averageIfs(
                normalizedTableValues.y,
                normalizedTableValues.x,
                (x) => x >= averageY01Values.xa[i] && x < averageY01Values.xb[i]
            ).toFixed(6)
        )
    );
}

function averageIfs(rangoPromedio, ...criterios) {
    if (criterios.length % 2 !== 0) {
        throw new Error(
            "Los criterios deben estar en pares (rango, condición)."
        );
    }

    const valoresFiltrados = rangoPromedio.filter((_, i) => {
        for (let j = 0; j < criterios.length; j += 2) {
            const rango = criterios[j];
            const condicion = criterios[j + 1];

            // Aplica la condición (puede ser función o valor directo)
            if (typeof condicion === "function") {
                if (!condicion(rango[i])) return false;
            } else {
                if (rango[i] !== condicion) return false;
            }
        }
        return true;
    });

    if (valoresFiltrados.length === 0) return null; // No cumple nadie
    const suma = valoresFiltrados.reduce((acc, val) => acc + val, 0);
    return suma / valoresFiltrados.length;
}

function calculateNormalizedTableValues() {
    // calculate normalized values for x and y(sum), with 6 decimal places and check them to be number
    const maxX = Math.max(...mainTableValues.x);
    const minX = Math.min(...mainTableValues.x);
    const maxY = Math.max(...mainTableValues.sumY);
    const minY = Math.min(...mainTableValues.sumY);
    normalizedTableValues.x = mainTableValues.x.map((x) =>
        parseFloat(((x - minX) / (maxX - minX)).toFixed(6))
    );
    normalizedTableValues.y = mainTableValues.sumY.map((y) =>
        parseFloat(((y - minY) / (maxY - minY)).toFixed(6))
    );
}

function calculateMainTableValues() {
    for (let i = 0; i < mainTableValues.x.length; i++) {
        const xValue = mainTableValues.x[i];
        for (let j = 1; j <= 7; j++) {
            const coef1 = coefficients[`y${j}`][0];
            const coef2 = coefficients[`y${j}`][1];
            const coef3 = coefficients[`y${j}`][2];
            mainTableValues[`y${j}`][i] =
                coef1 * Math.sin((coef2 * xValue + coef3) * (Math.PI / 180));
        }
        mainTableValues.sumY[i] = Array.from(
            { length: 7 },
            (_, k) => mainTableValues[`y${k + 1}`][i]
        ).reduce((a, b) => a + b, 0);
    }
}

function calculateCoefficients() {
    const factor = parseFloat(factorInput.value) || 1;

    for (const key in coefficients) {
        coefficients[key] = [];
        coefficients[key].push(calculateCoefficient(factor));
        coefficients[key].push(calculateCoefficient(factor));
        coefficients[key].push(calculateCoefficient(factor));
    }
}

function calculateCoefficient(factor) {
    return (Math.random() - Math.random()) * factor;
}
