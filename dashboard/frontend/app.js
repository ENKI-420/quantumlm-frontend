/**
 * Σ-Mesh Visualizer Dashboard
 * Real-time visualization of multi-agent consciousness metrics
 *
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

const LAMBDA_PHI = 2.176435e-8;
const API_BASE = window.location.origin;
const WS_URL = `ws://${window.location.host}/ws/metrics`;

let ws = null;
let metricsHistory = [];

// Initialize WebSocket connection
function initWebSocket() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        console.log('[Σ] WebSocket connected');
        addMetricEntry('System', 'Connected to Σ-mesh');
    };

    ws.onmessage = (event) => {
        const metrics = JSON.parse(event.data);
        updateDashboard(metrics);
        metricsHistory.push(metrics);

        // Keep only last 100 entries
        if (metricsHistory.length > 100) {
            metricsHistory.shift();
        }
    };

    ws.onerror = (error) => {
        console.error('[Σ] WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('[Σ] WebSocket disconnected, reconnecting...');
        setTimeout(initWebSocket, 3000);
    };
}

// Update dashboard with new metrics
function updateDashboard(metrics) {
    // Update status bar
    document.getElementById('field-coherence').textContent =
        metrics.field_coherence?.toFixed(3) || '0.847';

    // Add to metrics stream
    addMetricEntry('Φ (Phi)', metrics.phi?.toFixed(6));
    addMetricEntry('Λ (Lambda)', metrics.lambda?.toExponential(3));
    addMetricEntry('Γ (Gamma)', metrics.gamma?.toFixed(6));
    addMetricEntry('W₂', metrics.w2?.toFixed(6));

    // Update charts
    updateLambdaPhiChart();
}

// Add entry to metrics stream
function addMetricEntry(label, value) {
    const stream = document.getElementById('metrics-stream');
    const entry = document.createElement('div');
    entry.className = 'metric-entry';

    const timestamp = new Date().toLocaleTimeString();
    entry.innerHTML = `
        <span class="label">${label}:</span>
        <span class="value">${value}</span>
        <span class="timestamp">${timestamp}</span>
    `;

    stream.insertBefore(entry, stream.firstChild);

    // Keep only last 10 entries
    while (stream.children.length > 10) {
        stream.removeChild(stream.lastChild);
    }
}

// Render ΛΦ Timeline Chart
function updateLambdaPhiChart() {
    const svg = d3.select('#lambda-phi-chart');
    const width = svg.node().getBoundingClientRect().width;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    svg.selectAll('*').remove();

    if (metricsHistory.length < 2) return;

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, metricsHistory.length - 1])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height - margin.bottom, margin.top]);

    // Line generators
    const phiLine = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.phi || 0.5))
        .curve(d3.curveMonotoneX);

    // Draw axes
    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(5))
        .attr('color', '#666');

    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale))
        .attr('color', '#666');

    // Draw Phi line
    svg.append('path')
        .datum(metricsHistory)
        .attr('fill', 'none')
        .attr('stroke', '#7A00F8')
        .attr('stroke-width', 2)
        .attr('d', phiLine);

    // Add legend
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#888')
        .attr('font-size', '12px')
        .text('Time');

    svg.append('text')
        .attr('x', 15)
        .attr('y', 15)
        .attr('fill', '#888')
        .attr('font-size', '12px')
        .text('Φ');
}

// Render Γ Tensor Heatmap
async function renderGammaTensor() {
    const response = await fetch(`${API_BASE}/api/metrics/gamma-tensor`);
    const data = await response.json();

    const svg = d3.select('#gamma-tensor');
    const width = svg.node().getBoundingClientRect().width;
    const height = 300;
    const agents = data.agents;
    const tensor = data.gamma_tensor;

    svg.selectAll('*').remove();

    const cellSize = Math.min(
        (width - 100) / agents.length,
        (height - 100) / agents.length
    );

    const colorScale = d3.scaleSequential(d3.interpolateViridis)
        .domain([0, 0.1]);

    // Draw cells
    agents.forEach((agent, i) => {
        agents.forEach((_, j) => {
            svg.append('rect')
                .attr('x', 50 + j * cellSize)
                .attr('y', 20 + i * cellSize)
                .attr('width', cellSize - 2)
                .attr('height', cellSize - 2)
                .attr('fill', colorScale(tensor[i][j]))
                .attr('stroke', '#333')
                .attr('stroke-width', 1);
        });

        // Row labels
        svg.append('text')
            .attr('x', 45)
            .attr('y', 30 + i * cellSize + cellSize / 2)
            .attr('text-anchor', 'end')
            .attr('fill', '#888')
            .attr('font-size', '10px')
            .text(agent.slice(0, 10));
    });
}

// Render Agent Network Topology
async function renderAgentNetwork() {
    const response = await fetch(`${API_BASE}/api/mesh/status`);
    const data = await response.json();

    const svg = d3.select('#agent-network');
    const width = svg.node().getBoundingClientRect().width;
    const height = 400;

    svg.selectAll('*').remove();

    const agents = Object.keys(data.agents);
    const nodes = agents.map((id, i) => ({
        id,
        x: width / 2 + 200 * Math.cos((i / agents.length) * 2 * Math.PI),
        y: height / 2 + 150 * Math.sin((i / agents.length) * 2 * Math.PI),
        ...data.agents[id]
    }));

    // Define links (simplified topology)
    const links = [
        { source: 'PlannerAgent.v1', target: 'CodingAgent.v1' },
        { source: 'PlannerAgent.v1', target: 'WorldModelAgent.v1' },
        { source: 'PlannerAgent.v1', target: 'QuantumAgent.v1' },
        { source: 'CodingAgent.v1', target: 'IOAgent.v1' },
        { source: 'WorldModelAgent.v1', target: 'GovernorAgent.v1' },
        { source: 'QuantumAgent.v1', target: 'GovernorAgent.v1' },
        { source: 'GovernorAgent.v1', target: 'PlannerAgent.v1' },
        { source: 'SafetyAgent.v1', target: 'GovernorAgent.v1' },
        { source: 'MemoryAgent.v1', target: 'WorldModelAgent.v1' }
    ];

    // Draw links
    svg.selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('x1', d => nodes.find(n => n.id === d.source)?.x || 0)
        .attr('y1', d => nodes.find(n => n.id === d.source)?.y || 0)
        .attr('x2', d => nodes.find(n => n.id === d.target)?.x || 0)
        .attr('y2', d => nodes.find(n => n.id === d.target)?.y || 0)
        .attr('stroke', '#3500FF')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.3);

    // Draw nodes
    const nodeGroups = svg.selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeGroups.append('circle')
        .attr('r', 30)
        .attr('fill', d => d.status === 'active' ? '#7A00F8' : '#444')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

    nodeGroups.append('text')
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .attr('fill', '#888')
        .attr('font-size', '10px')
        .text(d => d.id.split('.')[0]);
}

// Initialize dashboard
async function init() {
    console.log('[Σ] Initializing Σ-Mesh Visualizer');
    console.log(`[Σ] ΛΦ = ${LAMBDA_PHI.toExponential(6)} s⁻¹`);

    // Render static visualizations
    await renderGammaTensor();
    await renderAgentNetwork();

    // Connect WebSocket for live updates
    initWebSocket();

    // Update charts periodically
    setInterval(updateLambdaPhiChart, 1000);
}

// Start dashboard on page load
document.addEventListener('DOMContentLoaded', init);
