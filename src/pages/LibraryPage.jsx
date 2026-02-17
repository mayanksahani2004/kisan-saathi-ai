import { useState } from 'react';
import { useLanguage } from '../utils/i18n';
import { useLibrary } from '../utils/LibraryContext';

export default function LibraryPage() {
    const { t } = useLanguage();
    const { chatHistory, detectionHistory } = useLibrary();
    const [activeTab, setActiveTab] = useState('chats'); // 'chats' or 'health'

    return (
        <div className="library-page page-wrapper">
            <div className="library-tabs">
                <button
                    className={`library-tab ${activeTab === 'chats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chats')}
                >
                    💬 {t('chat_history')}
                </button>
                <button
                    className={`library-tab ${activeTab === 'health' ? 'active' : ''}`}
                    onClick={() => setActiveTab('health')}
                >
                    🔬 {t('health_history')}
                </button>
            </div>

            <div className="library-content">
                <div className="insights-banner">
                    {t('insights_tip')}
                </div>

                {activeTab === 'chats' && (
                    <div className="history-list">
                        {chatHistory.length > 0 ? (
                            chatHistory.map((chat) => (
                                <div key={chat.id} className="history-card chat-record">
                                    <div className="record-header">
                                        <span className="record-time">{chat.timestamp}</span>
                                        <span className="record-lang">🌐 {chat.lang}</span>
                                    </div>
                                    <div className="record-query">
                                        <strong>Q:</strong> {chat.query}
                                    </div>
                                    <div className="record-response">
                                        <strong>A:</strong> {chat.response}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <span>📭</span>
                                <p>{t('no_chats')}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'health' && (
                    <div className="history-list">
                        {detectionHistory.length > 0 ? (
                            detectionHistory.map((record) => (
                                <div key={record.id} className="history-card health-record">
                                    <div className="record-header">
                                        <span className="record-time">{record.timestamp}</span>
                                        <span className={`severity-tag severity--${record.result.severity.toLowerCase()}`}>
                                            {record.result.severity}
                                        </span>
                                    </div>
                                    <div className="health-record-content">
                                        <div className="health-record-img">
                                            <img src={record.image} alt="Crop" />
                                        </div>
                                        <div className="health-record-info">
                                            <h4>{record.result.name}</h4>
                                            <p className="confidence-text">{t('confidence')}: {record.result.confidence}%</p>
                                            <p className="desc-preview">{record.result.description.substring(0, 100)}...</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <span>📸</span>
                                <p>{t('no_detections')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .library-page {
                    padding: 20px;
                    padding-bottom: 100px;
                }
                .library-tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                    position: sticky;
                    top: 80px;
                    z-index: 10;
                    background: var(--bg-primary);
                    padding: 5px 0;
                }
                .library-tab {
                    flex: 1;
                    padding: 12px;
                    border-radius: 12px;
                    border: 2px solid #e0e0e0;
                    background: white;
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: var(--gray-600);
                    transition: all 0.2s;
                }
                .library-tab.active {
                    background: var(--green-600);
                    color: white;
                    border-color: var(--green-600);
                    box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
                }
                .insights-banner {
                    background: var(--blue-50);
                    border: 1px solid var(--blue-100);
                    color: var(--blue-700);
                    padding: 12px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    margin-bottom: 20px;
                }
                .history-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .history-card {
                    background: white;
                    border-radius: 16px;
                    padding: 15px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
                    border: 1px solid #f0f0f0;
                }
                .record-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                    border-bottom: 1px solid #f5f5f5;
                    padding-bottom: 8px;
                }
                .record-time {
                    font-size: 0.75rem;
                    color: #999;
                }
                .record-lang {
                    font-size: 0.75rem;
                    background: #f0f0f0;
                    padding: 2px 8px;
                    border-radius: 10px;
                    color: #666;
                }
                .record-query {
                    font-size: 0.9rem;
                    color: var(--green-800);
                    margin-bottom: 8px;
                }
                .record-response {
                    font-size: 0.85rem;
                    color: #444;
                    line-height: 1.4;
                    padding: 10px;
                    background: #f9fdf9;
                    border-radius: 8px;
                }
                .health-record-content {
                    display: flex;
                    gap: 12px;
                }
                .health-record-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                }
                .health-record-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .health-record-info h4 {
                    font-size: 1rem;
                    margin-bottom: 4px;
                    color: #333;
                }
                .confidence-text {
                    font-size: 0.75rem;
                    color: var(--green-600);
                    font-weight: 600;
                    margin-bottom: 4px;
                }
                .desc-preview {
                    font-size: 0.8rem;
                    color: #777;
                    line-height: 1.3;
                }
                .severity-tag {
                    font-size: 0.7rem;
                    font-weight: bold;
                    padding: 2px 8px;
                    border-radius: 10px;
                    text-transform: uppercase;
                }
                .severity--low { background: #e8f5e9; color: #2e7d32; }
                .severity--moderate { background: #fff3e0; color: #ef6c00; }
                .severity--high { background: #ffeeb2; color: #d32f2f; }
                
                .empty-state {
                    text-align: center;
                    padding: 50px 20px;
                    color: #ccc;
                }
                .empty-state span {
                    font-size: 3rem;
                    display: block;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
}
