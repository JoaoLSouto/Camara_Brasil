const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rota raiz para orientação
app.get('/', (req, res) => {
    res.json({
        message: 'API do X - Servidor Backend',
        endpoints: {
            tweets: '/api/tweets?username=camaradeputados',
            test: '/api/test'
        },
        info: 'Acesse o app React em http://localhost:3000/redesocial'
    });
});

// Endpoint de teste para verificar o token
app.get('/api/test', async (req, res) => {
    try {
        const token = process.env.REACT_APP_TWITTER_BEARER_TOKEN;
        console.log('Token:', token?.substring(0, 20) + '...');

        const response = await axios.get(
            'https://api.x.com/2/users/by/username/camaradeputados',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Erro no teste:', error.response?.data);
        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});

// Endpoint para buscar tweets específicos por IDs
app.get('/api/tweets', async (req, res) => {
    try {
        const token = process.env.REACT_APP_TWITTER_BEARER_TOKEN;

        // IDs de tweets específicos da @camaradeputados (você pode atualizar estes IDs)
        const tweetIds = req.query.ids?.split(',') || [
            '2018655710473597283',
            '1884964757473226971',
            '1884951436816466365',
            '1884919854039101606',
            '1884897339719532664'
        ];

        console.log('Buscando tweets por IDs:', tweetIds);

        // Buscar múltiplos tweets por IDs
        const response = await axios.get(
            'https://api.x.com/2/tweets',
            {
                params: {
                    ids: tweetIds.join(','),
                    'tweet.fields': 'created_at,public_metrics,author_id',
                    'expansions': 'author_id',
                    'user.fields': 'name,username,profile_image_url'
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log('Tweets encontrados:', response.data.data?.length || 0);
        res.json(response.data);
    } catch (error) {
        console.error('Erro detalhado:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
        });
        res.status(error.response?.status || 500).json({
            error: 'Erro ao buscar tweets',
            details: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy rodando em http://localhost:${PORT}`);
});
