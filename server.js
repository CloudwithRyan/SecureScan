
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

// Security and request middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
    })
);

// Temporary in-memory project data
const projects = [
    { id: 1, name: 'SecureScan', status: 'active' },
    { id: 2, name: 'TerraGuard', status: 'planned' },
];

// Request validation schema
const projectSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
});

// Home endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to SecureScan',
        project: 'FinForge Security Scanner',
        status: 'Running',
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Security status
app.get('/api/security/status', (req, res) => {
    res.json({
        application: 'FinForge',
        securityScanning: 'Pipeline configuration pending',
        status: 'Development',
    });
});

// List projects
app.get('/api/projects', (req, res) => {
    res.json({ projects });
});


// Create a project
app.post('/api/projects', (req, res) => {
    const { error, value } = projectSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: 'Invalid project data',
            details: error.details.map((detail) => detail.message),
        });
    }

    const project = {
        id: projects.length + 1,
        name: value.name,
        status: 'active',
    };

    projects.push(project);

    return res.status(201).json({ project });
});

app.listen(PORT, () => {
    console.log(`SecureScan running at http://localhost:${PORT}`);
});

