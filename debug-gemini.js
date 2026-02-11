const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listAllModels() {
    const apiKey = 'AIzaSyAqtL3JJgWWHFge6bC6o4WEIUoPhJoah5Y';
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        // There isn't a direct listModels in the browser SDK but let's try a common one
        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent('Hi');
                console.log(`Model ${m} is available`);
            } catch (e) {
                console.log(`Model ${m} failed: ${e.message}`);
            }
        }
    } catch (e) {
        console.error('List failed:', e.message);
    }
}

listAllModels();
