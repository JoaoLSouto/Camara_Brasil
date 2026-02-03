import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { FaTwitter, FaHeart, FaRetweet, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';

const TwitterFeed = () => {
    const { colors } = useTheme();
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ⚠️ ATENÇÃO: Bearer token configurado
    // IMPORTANTE: Nunca exponha tokens no frontend em produção - use um backend/proxy
    const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAH9t7QEAAAAAz9I%2BYaqdqbx4%2BDf9i6WsmGl8yxg%3DDKQDoE52JUTpzdRcPzuYtAdyRmH2uZBkrbOKsUFzPK8Ofut0tP';

    useEffect(() => {
        fetchTwitterFeed();
    }, []);

    const fetchTwitterFeed = async () => {
        setLoading(true);
        setError(null);

        try {
            // Primeiro, buscar o ID do usuário @camaradeputados
            const userResponse = await axios.get(
                'https://api.twitter.com/2/users/by/username/camaradeputados',
                {
                    headers: {
                        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
                    }
                }
            );

            const userId = userResponse.data.data.id;

            // Depois, buscar os tweets do usuário
            const tweetsResponse = await axios.get(
                `https://api.twitter.com/2/users/${userId}/tweets`,
                {
                    headers: {
                        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
                    },
                    params: {
                        'max_results': 10,
                        'tweet.fields': 'created_at,public_metrics,author_id',
                        'expansions': 'author_id',
                        'user.fields': 'name,username,profile_image_url'
                    }
                }
            );

            const tweetsData = tweetsResponse.data.data || [];
            const usersData = tweetsResponse.data.includes?.users?.[0] || {};

            // Combinar tweets com dados do autor
            const tweetsWithAuthor = tweetsData.map(tweet => ({
                ...tweet,
                author: usersData
            }));

            setTweets(tweetsWithAuthor);
            console.log('✅ Tweets carregados:', tweetsWithAuthor.length);
        } catch (err) {
            console.error('❌ Erro ao buscar tweets:', err);
            const errorMessage = err.response?.data?.title ||
                err.response?.data?.detail ||
                err.message ||
                'Erro ao carregar tweets';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'agora';
        if (diffMins < 60) return `${diffMins}m`;
        if (diffHours < 24) return `${diffHours}h`;
        if (diffDays < 7) return `${diffDays}d`;
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                backgroundColor: colors.card,
                borderRadius: '16px',
                padding: '60px'
            }}>
                <Spinner animation="border" style={{ width: '3rem', height: '3rem', color: '#1d9bf0' }} />
                <p style={{ marginTop: '20px', fontSize: '16px', color: colors.textSecondary }}>
                    Carregando tweets da Câmara...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                <Alert.Heading style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaTwitter /> Erro ao Carregar Tweets
                </Alert.Heading>
                <p style={{ marginBottom: '15px' }}>
                    <strong>Mensagem:</strong> {error}
                </p>
                <hr />
                <div style={{ fontSize: '14px' }}>
                    <p><strong>⚠️ Possíveis causas:</strong></p>
                    <ul style={{ marginBottom: '15px' }}>
                        <li><strong>Token inválido:</strong> O Bearer token precisa ser obtido em developer.twitter.com</li>
                        <li><strong>API paga:</strong> A API do Twitter v2 requer pagamento (mínimo $200/mês)</li>
                        <li><strong>Rate limit:</strong> Limite de requisições excedido</li>
                        <li><strong>CORS:</strong> Requisições diretas do navegador são bloqueadas (precisa de backend/proxy)</li>
                    </ul>
                    <p><strong>✅ Solução recomendada:</strong></p>
                    <ol>
                        <li>Criar um backend (Node.js/Python) para fazer as requisições</li>
                        <li>Armazenar o Bearer token no backend (não no frontend)</li>
                        <li>Seu frontend chama seu backend, que chama a API do Twitter</li>
                    </ol>
                    <a
                        href="https://twitter.com/camaradeputados"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{
                            marginTop: '10px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <FaExternalLinkAlt /> Ver no Twitter diretamente
                    </a>
                </div>
            </Alert>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {tweets.length === 0 ? (
                <Alert variant="info">
                    Nenhum tweet encontrado para @camaradeputados
                </Alert>
            ) : (
                tweets.map((tweet) => (
                    <Card
                        key={tweet.id}
                        style={{
                            border: 'none',
                            borderRadius: '12px',
                            backgroundColor: colors.card,
                            boxShadow: `0 2px 8px ${colors.shadow}`,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = `0 6px 16px ${colors.shadow}`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = `0 2px 8px ${colors.shadow}`;
                        }}
                    >
                        <Card.Body style={{ padding: '20px' }}>
                            {/* Header do Tweet */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '15px'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#1d9bf0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '18px'
                                }}>
                                    {tweet.author?.name?.[0] || 'C'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontWeight: '700',
                                        color: colors.text,
                                        fontSize: '15px'
                                    }}>
                                        {tweet.author?.name || 'Câmara dos Deputados'}
                                    </div>
                                    <div style={{
                                        color: colors.textSecondary,
                                        fontSize: '14px'
                                    }}>
                                        @{tweet.author?.username || 'camaradeputados'} · {formatDate(tweet.created_at)}
                                    </div>
                                </div>
                                <FaTwitter style={{ color: '#1d9bf0', fontSize: '20px' }} />
                            </div>

                            {/* Conteúdo do Tweet */}
                            <div style={{
                                color: colors.text,
                                fontSize: '15px',
                                lineHeight: '1.5',
                                marginBottom: '15px',
                                wordWrap: 'break-word'
                            }}>
                                {tweet.text}
                            </div>

                            {/* Métricas */}
                            {tweet.public_metrics && (
                                <div style={{
                                    display: 'flex',
                                    gap: '20px',
                                    paddingTop: '12px',
                                    borderTop: `1px solid ${colors.border}`,
                                    color: colors.textSecondary,
                                    fontSize: '14px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaHeart style={{ color: '#f91880' }} />
                                        <span>{tweet.public_metrics.like_count || 0}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaRetweet style={{ color: '#00ba7c' }} />
                                        <span>{tweet.public_metrics.retweet_count || 0}</span>
                                    </div>
                                    <a
                                        href={`https://twitter.com/camaradeputados/status/${tweet.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            marginLeft: 'auto',
                                            color: '#1d9bf0',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Ver tweet <FaExternalLinkAlt size={12} />
                                    </a>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export { TwitterFeed };
