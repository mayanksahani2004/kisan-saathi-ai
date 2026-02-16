import { useState, useCallback } from 'react';
import { analyzeCropImage } from '../data/cropDiseases';
import { useLanguage } from '../utils/i18n';

export default function CropHealthPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const { t } = useLanguage();

    const handleImageSelect = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setResult(null);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const handleFileInput = (e) => {
        const file = e.target.files?.[0];
        if (file) handleImageSelect(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) handleImageSelect(file);
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;
        setAnalyzing(true);
        setResult(null);
        try {
            const diagnosis = await analyzeCropImage();
            setResult(diagnosis);
        } catch (err) {
            console.error('Analysis failed:', err);
        }
        setAnalyzing(false);
    };

    const handleReset = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setResult(null);
        setAnalyzing(false);
    };

    const severityClass = result?.severity?.toLowerCase() || 'low';

    return (
        <div className="crop-page page-wrapper">
            <div className="crop-page__header">
                <h2>🔬 {t('crop_title')}</h2>
                <p>{t('crop_subtitle')}</p>
            </div>

            {/* Upload Zone */}
            {!imagePreview && (
                <div
                    className={`upload-zone ${dragActive ? 'upload-zone--active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <span className="upload-zone__icon">📸</span>
                    <div className="upload-zone__title">{t('upload_title')}</div>
                    <div className="upload-zone__subtitle">{t('upload_subtitle')}</div>
                    <button className="upload-zone__btn" id="upload-btn">
                        📷 {t('choose_photo')}
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileInput}
                        id="crop-image-input"
                    />
                </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
                <div>
                    <div className="crop-preview">
                        <img src={imagePreview} alt="Uploaded crop leaf" />
                        <div className="crop-preview__overlay">
                            <span>{selectedImage?.name || 'Leaf Image'}</span>
                            <button
                                onClick={handleReset}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    color: '#fff',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                ✕ {t('remove')}
                            </button>
                        </div>
                    </div>

                    {!analyzing && !result && (
                        <button
                            className="crop-analyze-btn"
                            onClick={handleAnalyze}
                            id="analyze-btn"
                        >
                            🔬 {t('analyze_btn')}
                        </button>
                    )}
                </div>
            )}

            {/* Loading Animation */}
            {analyzing && (
                <div className="crop-loading">
                    <div className="crop-loading__spinner"></div>
                    <div className="crop-loading__text">{t('analyzing')}</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>
                        {t('analyzing_detail')}
                    </p>
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="crop-result">
                    <div className={`crop-result__header crop-result__header--${severityClass}`}>
                        <div>
                            <span className={`crop-result__severity crop-result__severity--${severityClass}`}>
                                {severityClass === 'low' && '🟢'}
                                {severityClass === 'moderate' && '🟡'}
                                {severityClass === 'high' && '🔴'}
                                {' '}{result.severity} {t('severity')}
                            </span>
                            <div className="crop-result__disease" style={{ marginTop: 8 }}>
                                {result.name}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                {t('confidence')}: {result.confidence}%
                            </div>
                        </div>
                    </div>

                    <div className="crop-result__body">
                        <div className="crop-result__section">
                            <div className="crop-result__section-title">📋 {t('description')}</div>
                            <div className="crop-result__section-text">{result.description}</div>
                        </div>

                        <div className="crop-result__section">
                            <div className="crop-result__section-title">💡 {t('recommended_actions')}</div>
                            <ul className="crop-result__action-list">
                                {result.actions.map((action, i) => (
                                    <li key={i} className="crop-result__action-item">
                                        <span className="crop-result__action-icon">{action.icon}</span>
                                        <span>{action.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div style={{ padding: '0 20px 20px' }}>
                        <button
                            className="crop-analyze-btn"
                            onClick={handleReset}
                            style={{ background: 'linear-gradient(135deg, var(--gray-500), var(--gray-600))' }}
                        >
                            📸 {t('upload_another')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
