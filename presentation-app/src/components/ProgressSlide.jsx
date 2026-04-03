import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, RefreshCw, Download, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, DollarSign, Users, Target, FileText } from 'lucide-react';

const ProgressSlide = () => {
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

    // Load from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('subsidy_progress_data');
        if (savedData) {
            setData(JSON.parse(savedData));
        } else {
            // Seed initial data if empty
            setData([
                { id: 1, date: '2025-12-10', name: '桐原', purpose: '鹿児島出張 (打合せ)', budget: 50000, actual: 48000, progress: '完了', category: '旅費', notes: '鹿児島空港〜市内移動含む' },
                { id: 2, date: '2025-12-15', name: '役務費', purpose: 'パンフレット作成', budget: 350000, actual: 330000, progress: '完了', category: '広報費', notes: '印刷費込み' },
            ]);
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('subsidy_progress_data', JSON.stringify(data));
    }, [data]);

    const addRow = () => {
        setData([...data, {
            id: Date.now(),
            date: '',
            name: '',
            purpose: '',
            budget: 0,
            actual: 0,
            progress: '未着手',
            category: '旅費',
            notes: ''
        }]);
    };

    const updateRow = (id, field, value) => {
        setData(data.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        }));
    };

    const deleteRow = (id) => {
        setData(data.filter(row => row.id !== id));
    };

    const formatCurrency = (val) => {
        return Number(val).toLocaleString() + '円';
    };

    // Calculations
    const totalBudget = data.reduce((acc, row) => acc + Number(row.budget), 0);
    const totalActual = data.reduce((acc, row) => acc + Number(row.actual), 0);
    const totalBalance = totalBudget - totalActual;
    const executionRate = totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0;

    // Budget totals by category
    const categoryTotals = data.reduce((acc, row) => {
        const cat = row.category || 'その他';
        if (!acc[cat]) acc[cat] = { budget: 0, actual: 0 };
        acc[cat].budget += Number(row.budget);
        acc[cat].actual += Number(row.actual);
        return acc;
    }, {});

    // Progress counts
    const progressCounts = data.reduce((acc, row) => {
        acc[row.progress] = (acc[row.progress] || 0) + 1;
        return acc;
    }, {});

    const progressOptions = ['未着手', '進行中', '承認待', '支払済', '完了'];
    const categoryOptions = ['旅費', '広報費', '研修費', '人件費', 'その他'];

    return (
        <div className="slide">
            <div className="slide-header">
                <div className="header-left">
                    <h1 className="slide-title">進捗管理リスト</h1>
                    <p className="subtitle">補助金執行状況のリアルタイム管理</p>
                </div>
                <div className="header-right">
                    <div className="stat-card main">
                        <span className="stat-label">予算消化率</span>
                        <span className="stat-value" style={{ color: executionRate > 80 ? '#ef4444' : executionRate > 50 ? '#f59e0b' : '#10b981' }}>
                            {executionRate}%
                        </span>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${executionRate}%` }}></div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">予算合計</span>
                        <span className="stat-value">{formatCurrency(totalBudget)}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">実績合計</span>
                        <span className="stat-value" style={{ color: totalActual > totalBudget ? '#ef4444' : '#10b981' }}>
                            {formatCurrency(totalActual)}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">残額</span>
                        <span className="stat-value" style={{ color: totalBalance < 0 ? '#ef4444' : '#4f46e5' }}>
                            {formatCurrency(totalBalance)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="slide-content" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Summary Cards */}
                <div className="summary-bar">
                    <div className="summary-item">
                        <Users size={16} />
                        <span>総件数: <strong>{data.length}</strong></span>
                    </div>
                    {progressOptions.map(progress => (
                        progressCounts[progress] > 0 && (
                            <div key={progress} className="summary-item">
                                {progress === '完了' && <CheckCircle size={16} color="#10b981" />}
                                {progress === '進行中' && <Clock size={16} color="#f59e0b" />}
                                {progress === '未着手' && <AlertCircle size={16} color="#94a3b8" />}
                                {progress === '承認待' && <FileText size={16} color="#4f46e5" />}
                                {progress === '支払済' && <DollarSign size={16} color="#8b5cf6" />}
                                <span>{progress}: <strong>{progressCounts[progress]}</strong></span>
                            </div>
                        )
                    ))}
                    <div className="view-toggle">
                        <button className={viewMode === 'table' ? 'active' : ''} onClick={() => setViewMode('table')}>表</button>
                        <button className={viewMode === 'cards' ? 'active' : ''} onClick={() => setViewMode('cards')}>カード</button>
                    </div>
                </div>

                {/* Category Summary */}
                <div className="category-summary">
                    {Object.entries(categoryTotals).map(([cat, vals]) => (
                        <div key={cat} className="category-badge">
                            <span className="cat-name">{cat}</span>
                            <span className="cat-budget">{formatCurrency(vals.budget)}</span>
                            <span className="cat-actual" style={{ color: vals.actual > vals.budget ? '#ef4444' : '#10b981' }}>
                                {formatCurrency(vals.actual)}
                            </span>
                        </div>
                    ))}
                </div>

                {viewMode === 'table' ? (
                    <div className="table-wrapper">
                        <table className="interactive-table">
                            <thead>
                                <tr>
                                    <th width="110">日付</th>
                                    <th width="100">カテゴリ</th>
                                    <th width="100">担当者</th>
                                    <th>目的・内容</th>
                                    <th width="110">予算額</th>
                                    <th width="110">実績額</th>
                                    <th width="90">差額</th>
                                    <th width="100">進捗</th>
                                    <th width="40"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row) => (
                                    <tr key={row.id}>
                                        <td>
                                            <input
                                                type="date"
                                                value={row.date}
                                                onChange={(e) => updateRow(row.id, 'date', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={row.category}
                                                onChange={(e) => updateRow(row.id, 'category', e.target.value)}
                                            >
                                                {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={row.name}
                                                placeholder="氏名"
                                                onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={row.purpose}
                                                placeholder="内容"
                                                onChange={(e) => updateRow(row.id, 'purpose', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={row.budget}
                                                onChange={(e) => updateRow(row.id, 'budget', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={row.actual}
                                                onChange={(e) => updateRow(row.id, 'actual', e.target.value)}
                                            />
                                        </td>
                                        <td style={{
                                            color: (Number(row.budget) - Number(row.actual)) < 0 ? 'var(--danger)' : 'var(--success)',
                                            fontWeight: 'bold',
                                            fontVariantNumeric: 'tabular-nums'
                                        }}>
                                            {(Number(row.budget) - Number(row.actual)).toLocaleString()}
                                        </td>
                                        <td>
                                            <select
                                                value={row.progress}
                                                onChange={(e) => updateRow(row.id, 'progress', e.target.value)}
                                                className={`progress-${row.progress}`}
                                            >
                                                {progressOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        </td>
                                        <td>
                                            <button onClick={() => deleteRow(row.id)} className="icon-btn delete" title="削除">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="cards-wrapper">
                        {data.map((row) => (
                            <div key={row.id} className={`progress-card ${row.progress}`}>
                                <div className="card-top">
                                    <span className="card-date">{row.date || '----/--/--'}</span>
                                    <span className={`card-status ${row.progress}`}>{row.progress}</span>
                                </div>
                                <div className="card-body">
                                    <h4>{row.purpose || '内容未入力'}</h4>
                                    <div className="card-meta">
                                        <span className="category-tag">{row.category}</span>
                                        <span className="person">{row.name || '担当者未設定'}</span>
                                    </div>
                                </div>
                                <div className="card-financial">
                                    <div className="fin-row">
                                        <span>予算:</span>
                                        <span>{formatCurrency(row.budget)}</span>
                                    </div>
                                    <div className="fin-row">
                                        <span>実績:</span>
                                        <span>{formatCurrency(row.actual)}</span>
                                    </div>
                                    <div className="fin-row total">
                                        <span>差額:</span>
                                        <span style={{ color: (Number(row.budget) - Number(row.actual)) < 0 ? '#ef4444' : '#10b981' }}>
                                            {(Number(row.budget) - Number(row.actual)).toLocaleString()}円
                                        </span>
                                    </div>
                                </div>
                                <button onClick={() => deleteRow(row.id)} className="delete-btn">削除</button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="toolbar">
                    <button onClick={addRow} className="action-btn">
                        <Plus size={18} /> 行を追加
                    </button>
                    <span className="storage-note">
                        <Save size={14} />
                        ※ データはブラウザに自動保存されます
                    </span>
                </div>
            </div>

            <style>{`
                .slide-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .header-left .subtitle {
                    color: var(--text-secondary);
                    margin: 0;
                    font-size: 0.95rem;
                }
                .header-right {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                .stat-card {
                    background: white;
                    padding: 12px 20px;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border: 1px solid var(--card-border);
                    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05);
                    min-width: 100px;
                }
                .stat-card.main {
                    min-width: 140px;
                }
                .stat-label {
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                    margin-bottom: 4px;
                }
                .stat-value {
                    font-size: 1.3rem;
                    font-weight: 700;
                    font-variant-numeric: tabular-nums;
                }
                .progress-bar {
                    width: 100%;
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 3px;
                    margin-top: 6px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: var(--accent-primary);
                    border-radius: 3px;
                    transition: width 0.3s ease;
                }
                .summary-bar {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    border-bottom: 1px solid var(--card-border);
                    flex-wrap: wrap;
                }
                .summary-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }
                .summary-item strong {
                    color: var(--text-primary);
                }
                .view-toggle {
                    margin-left: auto;
                    display: flex;
                    border: 1px solid var(--card-border);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .view-toggle button {
                    padding: 6px 16px;
                    border: none;
                    background: white;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }
                .view-toggle button.active {
                    background: var(--accent-primary);
                    color: white;
                }
                .category-summary {
                    display: flex;
                    gap: 0.75rem;
                    padding: 1rem 1.5rem;
                    background: white;
                    border-bottom: 1px solid var(--card-border);
                    flex-wrap: wrap;
                }
                .category-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 6px 12px;
                    background: #f1f5f9;
                    border-radius: 20px;
                    font-size: 0.8rem;
                }
                .cat-name {
                    font-weight: 600;
                    color: var(--text-primary);
                }
                .cat-budget {
                    color: var(--text-secondary);
                }
                .table-wrapper {
                    flex: 1;
                    overflow-y: auto;
                }
                .interactive-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .interactive-table th, .interactive-table td {
                    padding: 12px;
                    border-bottom: 1px solid var(--card-border);
                    text-align: left;
                    vertical-align: middle;
                }
                .interactive-table th {
                    background: #f1f5f9;
                    color: var(--text-secondary);
                    font-weight: 600;
                    font-size: 0.8rem;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                .interactive-table input, .interactive-table select {
                    width: 100%;
                    background: transparent;
                    border: 1px solid transparent;
                    color: var(--text-primary);
                    padding: 6px 8px;
                    border-radius: 6px;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }
                .interactive-table input:focus, .interactive-table select:focus {
                    border-color: var(--accent-primary);
                    outline: none;
                    background: white;
                    box-shadow: 0 0 0 2px var(--accent-glow);
                }
                .progress-完了 { background: rgba(16, 185, 129, 0.15) !important; color: #10b981 !important; }
                .progress-進行中 { background: rgba(245, 158, 11, 0.15) !important; color: #f59e0b !important; }
                .progress-承認待 { background: rgba(79, 70, 229, 0.15) !important; color: #4f46e5 !important; }
                .progress-支払済 { background: rgba(139, 92, 246, 0.15) !important; color: #8b5cf6 !important; }
                .progress-未着手 { background: rgba(148, 163, 184, 0.15) !important; color: #64748b !important; }
                .icon-btn {
                    border: none;
                    background: transparent;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .icon-btn:hover {
                    color: var(--danger);
                    background: rgba(239, 68, 68, 0.1);
                }
                .cards-wrapper {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1rem;
                    padding: 1rem;
                    overflow-y: auto;
                }
                .progress-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1rem;
                    border: 1px solid var(--card-border);
                    position: relative;
                }
                .progress-card.完了 { border-left: 4px solid #10b981; }
                .progress-card.進行中 { border-left: 4px solid #f59e0b; }
                .progress-card.未着手 { border-left: 4px solid #94a3b8; }
                .progress-card.承認待 { border-left: 4px solid #4f46e5; }
                .progress-card.支払済 { border-left: 4px solid #8b5cf6; }
                .card-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                }
                .card-date {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }
                .card-status {
                    font-size: 0.75rem;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-weight: 600;
                }
                .card-body h4 {
                    margin: 0 0 0.5rem;
                    font-size: 1rem;
                    color: var(--text-primary);
                }
                .card-meta {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }
                .category-tag {
                    background: #f1f5f9;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                }
                .person {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }
                .card-financial {
                    background: #f8fafc;
                    border-radius: 8px;
                    padding: 0.75rem;
                    margin-bottom: 0.5rem;
                }
                .fin-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    padding: 2px 0;
                }
                .fin-row.total {
                    font-weight: 700;
                    color: var(--text-primary);
                    border-top: 1px solid #e2e8f0;
                    padding-top: 6px;
                    margin-top: 4px;
                }
                .delete-btn {
                    width: 100%;
                    padding: 6px;
                    border: 1px solid #fee2e2;
                    background: #fef2f2;
                    color: #ef4444;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.8rem;
                    transition: all 0.2s;
                }
                .delete-btn:hover {
                    background: #ef4444;
                    color: white;
                }
                .toolbar {
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid var(--card-border);
                }
                .action-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--accent-primary);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .action-btn:hover {
                    filter: brightness(1.1);
                    transform: translateY(-1px);
                }
                .storage-note {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }
            `}</style>
        </div>
    );
};

export default ProgressSlide;
