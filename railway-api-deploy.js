#!/usr/bin/env node

/**
 * Railway Programmatic Deployment Script
 * Based on official Railway API documentation
 * https://docs.railway.com/guides/manage-deployments
 */

const https = require('https');

// Configuration from your Railway environment variables
const RAILWAY_TOKEN = process.env.RAILWAY_TOKEN;
const SERVICE_ID = '0f4ab810-d9cc-43f7-b087-f1b930aa7543';
const ENVIRONMENT_ID = '59e8146e-67cb-4e10-b73a-fa656a356f58';
const PROJECT_ID = '8df3b1d6-2317-4400-b267-56c4a42eed06'; // You may need to get this

const GRAPHQL_ENDPOINT = 'https://backboard.railway.com/graphql/v2';

function makeRequest(query, variables = {}) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            query: query,
            variables: variables
        });

        const options = {
            hostname: 'backboard.railway.com',
            port: 443,
            path: '/graphql/v2',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RAILWAY_TOKEN}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.errors) {
                        console.error('❌ GraphQL errors:', response.errors);
                        reject(new Error(response.errors[0].message));
                    } else {
                        resolve(response.data);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

async function getCurrentDeployment() {
    console.log('📊 Fetching current deployment status...');
    
    const query = `
        query deployments($projectId: String!, $environmentId: String!, $serviceId: String!) {
            deployments(
                first: 1
                input: {
                    projectId: $projectId
                    environmentId: $environmentId
                    serviceId: $serviceId
                }
            ) {
                edges {
                    node {
                        id
                        staticUrl
                        status
                        createdAt
                    }
                }
            }
        }
    `;

    try {
        const result = await makeRequest(query, {
            projectId: PROJECT_ID,
            environmentId: ENVIRONMENT_ID,
            serviceId: SERVICE_ID
        });

        const deployment = result.deployments?.edges?.[0]?.node;
        if (deployment) {
            console.log('✅ Current deployment found:');
            console.log(`   ID: ${deployment.id}`);
            console.log(`   Status: ${deployment.status}`);
            console.log(`   URL: ${deployment.staticUrl}`);
            console.log(`   Created: ${deployment.createdAt}`);
        } else {
            console.log('⚠️  No current deployment found');
        }
        
        return deployment;
    } catch (error) {
        console.error('❌ Failed to fetch current deployment:', error.message);
        return null;
    }
}

async function redeployService() {
    console.log('🚀 Triggering service redeployment...');
    
    const mutation = `
        mutation serviceInstanceRedeploy($environmentId: String!, $serviceId: String!) {
            serviceInstanceRedeploy(
                environmentId: $environmentId
                serviceId: $serviceId
            )
        }
    `;

    try {
        const result = await makeRequest(mutation, {
            environmentId: ENVIRONMENT_ID,
            serviceId: SERVICE_ID
        });

        console.log('✅ Redeployment triggered successfully!');
        console.log('🌐 Your app will be live at: https://nomadly1.up.railway.app');
        return result;
    } catch (error) {
        console.error('❌ Failed to trigger redeployment:', error.message);
        throw error;
    }
}

async function restartCurrentDeployment(deploymentId) {
    console.log(`🔄 Restarting deployment: ${deploymentId}...`);
    
    const mutation = `
        mutation deploymentRestart($id: String!) {
            deploymentRestart(id: $id)
        }
    `;

    try {
        const result = await makeRequest(mutation, {
            id: deploymentId
        });

        console.log('✅ Deployment restarted successfully!');
        return result;
    } catch (error) {
        console.error('❌ Failed to restart deployment:', error.message);
        throw error;
    }
}

async function main() {
    console.log('🚀 Starting Railway programmatic deployment...');
    
    if (!RAILWAY_TOKEN) {
        console.error('❌ RAILWAY_TOKEN environment variable is not set!');
        console.log('📝 Please set your Railway token in Replit secrets');
        process.exit(1);
    }

    try {
        // Step 1: Check current deployment
        const currentDeployment = await getCurrentDeployment();
        
        // Step 2: Choose deployment strategy
        const action = process.argv[2];
        
        switch (action) {
            case 'restart':
                if (currentDeployment) {
                    await restartCurrentDeployment(currentDeployment.id);
                } else {
                    console.log('⚠️  No deployment to restart, triggering new deployment...');
                    await redeployService();
                }
                break;
                
            case 'redeploy':
            default:
                await redeployService();
                break;
        }
        
        console.log('🎉 Deployment operation completed successfully!');
        
    } catch (error) {
        console.error('💥 Deployment failed:', error.message);
        process.exit(1);
    }
}

// Run the deployment
if (require.main === module) {
    main();
}

module.exports = { getCurrentDeployment, redeployService, restartCurrentDeployment };