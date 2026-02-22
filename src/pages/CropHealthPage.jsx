import { useState, useCallback } from 'react';
import { analyzeCropImage } from '../services/cropAnalyzer';
import { useLanguage } from '../utils/i18n';
import { useLibrary } from '../utils/LibraryContext';
import { useSettings } from '../utils/SettingsContext';

export default function CropHealthPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);
    const { t, lang } = useLanguage();
    const { addToDetectionHistory } = useLibrary();
    const { isOffline } = useSettings();

    const handleImageSelect = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setResult(null);
            setError(null);
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
        if (!selectedImage || !imagePreview) return;
        setAnalyzing(true);
        setResult(null);
        setError(null);
        try {
            const diagnosis = await analyzeCropImage(imagePreview, isOffline, lang);

            if (!diagnosis || typeof diagnosis !== 'object') {
                throw new Error("Invalid response from analysis engine");
            }

            setResult(diagnosis);

            // Save to Library (using imagePreview which is base64)
            if (diagnosis.healthStatus !== 'Error') {
                await addToDetectionHistory(imagePreview, diagnosis);
            }
        } catch (err) {
            console.error('Analysis failed:', err);
            setError(err.message || "An unexpected error occurred during analysis.");
        }
        setAnalyzing(false);
    };

    const handleReset = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setResult(null);
        setError(null);
        setAnalyzing(false);
    };

    const severityClass = String(result?.severity || 'low').toLowerCase();

    return (
        <div className="crop-page page-wrapper">
            <div className="crop-page__header">
                <h2>🔬 {t('crop_title')}</h2>
                <p>{t('crop_subtitle')}</p>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid #fecaca',
                    fontSize: '0.9rem'
                }}>
                    <strong>⚠️ Error:</strong> {error}
                    <button
                        onClick={handleReset}
                        style={{ display: 'block', marginTop: '10px', color: '#991b1b', fontWeight: 'bold', background: 'none', border: 'none', padding: 0, textDecoration: 'underline' }}
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Upload Zone */}
            {!imagePreview && !error && (
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

            {/* Image Preview & Scanning UI */}
            {imagePreview && !error && (
                <div style={{ position: 'relative' }}>
                    <div className="crop-preview" style={{ marginBottom: result ? '0' : '20px' }}>
                        <img src={imagePreview} alt="Uploaded crop leaf" />

                        {/* Vision Scanning Overlays (YOLO Style) */}
                        {analyzing && (
                            <>
                                <div className="vision-scanner"></div>
                                <div className="vision-box" style={{ top: '20%', left: '15%', width: '30%', height: '25%' }}></div>
                                <div className="vision-box" style={{ top: '50%', left: '45%', width: '35%', height: '30%', animationDelay: '0.5s' }}></div>
                                <div className="vision-box" style={{ top: '10%', left: '60%', width: '20%', height: '20%', animationDelay: '1s' }}></div>
                            </>
                        )}

                        <div className="crop-preview__overlay">
                            <span>{selectedImage?.name || 'Leaf Image'}</span>
                            {!analyzing && !result && (
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
                            )}
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

            {/* Loading Status */}
            {analyzing && (
                <div className="crop-loading" style={{ marginTop: '-20px' }}>
                    <div className="crop-loading__spinner" style={{ width: 40, height: 40 }}></div>
                    <div className="crop-loading__text" style={{ fontSize: '1.2rem', color: 'var(--green-600)' }}>
                        🚀 {t('analyzing')}...
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>
                        {t('analyzing_detail')} (Vision AI & YOLO Scan)
                    </p>
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="crop-result">
                    <div className={`crop-result__header crop-result__header--${severityClass}`}>
                        <div>
                            <span className={`crop-result__severity crop-result__severity--${severityClass}`}>
                                {severityClass.includes('low') && '🟢'}
                                {severityClass.includes('moderate') && '🟡'}
                                {severityClass.includes('high') && '🔴'}
                                {' '}{String(result.severity || '')} {t('severity')}
                            </span>
                            <div className="crop-result__disease" style={{ marginTop: 8 }}>
                                {String(result.name || 'Unknown Identification')}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                {t('confidence')}: {result.confidence || 0}%
                            </div>
                        </div>
                    </div>

                    <div className="crop-result__body">
                        <div className="crop-result__section">
                            <div className="crop-result__section-title">📋 {t('description')}</div>
                            <div className="crop-result__section-text">
                                {typeof result.description === 'string' ? result.description : JSON.stringify(result.description)}
                            </div>
                        </div>

                        <div className="crop-result__section">
                            <div className="crop-result__section-title">💡 {t('recommended_actions')}</div>
                            <ul className="crop-result__action-list">
                                {result.actions && Array.isArray(result.actions) && result.actions.length > 0 ? (
                                    result.actions.map((action, i) => (
                                        <li key={i} className="crop-result__action-item">
                                            <span className="crop-result__action-icon">{String(action?.icon || 'ℹ️')}</span>
                                            <span>{String(action?.text || 'Keep monitoring')}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="crop-result__action-item">
                                        <span className="crop-result__action-icon">🌿</span>
                                        <span>No specific actions identified. Maintain standard care.</span>
                                    </li>
                                )}
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
