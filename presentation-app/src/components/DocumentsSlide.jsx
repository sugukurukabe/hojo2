import React from 'react';
import { FileText, FileSpreadsheet, Paperclip, CheckCircle, AlertTriangle, Calendar, DollarSign, Users, FileCheck, Archive } from 'lucide-react';

const DocumentsSlide = () => {
    const documentCategories = [
        {
            category: "定期報告書類",
            icon: <Calendar size={24} />,
            color: "#4f46e5",
            documents: [
                {
                    name: "別記様式第5号（事業遂行状況報告書）",
                    deadline: "1月31日",
                    description: "12月末までの活動実績を報告する重要な報告書",
                    items: [
                        "事業の進捗状況（計画 vs 実績）",
                        "経費執行状況（予算消化率）",
                        "旅費の内訳（回数・金額・対象者）",
                        "広報活動の実績"
                    ],
                    status: "要作成",
                    priority: "high"
                },
                {
                    name: "別記様式第7号（実績報告書）",
                    deadline: "3月31日",
                    description: "事業完了時の最終報告書",
                    items: [
                        "事業の実施状況全体",
                        "成果物の一覧・写真",
                        "経費精算一覧",
                        "課題と今後の展望"
                    ],
                    status: "予定",
                    priority: "high"
                }
            ]
        },
        {
            category: "予算・経費関連",
            icon: <DollarSign size={24} />,
            color: "#10b981",
            documents: [
                {
                    name: "旅費予算執行計画",
                    budget: "500万円",
                    description: "出張ごとの予算配分計画",
                    breakdown: [
                        { item: "桐原担当分", amount: "未定（複数回予定）" },
                        { item: "神戸担当分", amount: "未定（複数回予定）" },
                        { item: "吉原担当分", amount: "未定（複数回予定）" },
                        { item: "その他メンバー", amount: "要相談" }
                    ],
                    status: "進行中",
                    priority: "medium"
                },
                {
                    name: "役務費執行計画",
                    budget: "75万円",
                    description: "パンフレット・フライヤー等の広報費",
                    breakdown: [
                        { item: "パンフレット作成", amount: "33万円", status: "済" },
                        { item: "フライヤー作成", amount: "40万円", status: "予定" }
                    ],
                    status: "一部完了",
                    priority: "medium"
                },
                {
                    name: "研修費執行計画",
                    budget: "36万円",
                    description: "人材育成・研修関連の費用",
                    breakdown: [
                        { item: "研修費用", amount: "36万円", status: "計画中" }
                    ],
                    status: "計画中",
                    priority: "low"
                }
            ]
        },
        {
            category: "証憑書類",
            icon: <FileCheck size={24} />,
            color: "#f59e0b",
            documents: [
                {
                    name: "必須証憑一覧",
                    description: "補助金申請・監査に必要な全ての証拠書類",
                    items: [
                        "領収書・振込明細書（原本）",
                        "出張報告書・復命書",
                        "搭乗券半券・電車・バスの利用明細",
                        "宿泊費の明細書",
                        "成果物（パンフレット現物・写真等）",
                        "会議議事録・打合せメモ"
                    ],
                   保管場所: "原本は経理部門にて5年間保管",
                    status: "随時収集",
                    priority: "high"
                },
                {
                    name: "チェックポイント",
                    items: [
                        "宛名が「スグクル株式会社」になっているか",
                        "但書きが具体的か",
                        "日付が事業期間内か",
                        "金額に計算ミスはないか",
                        "原本とコピーが散逸していないか"
                    ],
                    status: "要確認",
                    priority: "high"
                }
            ]
        },
        {
            category: "各種様式・申請書",
            icon: <FileText size={24} />,
            color: "#8b5cf6",
            documents: [
                {
                    name: "別記様式第10号",
                    title: "財産管理台帳",
                    description: "購入した財産・備品の管理記録",
                    items: [
                        "財産の名称・数量",
                        "取得年月日・取得価格",
                        "保管場所・管理者",
                        "減価償却情報"
                    ],
                    status: "事業完了時作成",
                    priority: "medium"
                },
                {
                    name: "別記様式第2号",
                    title: "契約に係る指名停止等に関する申立書",
                    description: "契約に関する法令遵守の申立",
                    items: [
                        "指名停止等の有無",
                        "暴力団等との関係がないこと"
                    ],
                    status: "提出済",
                    priority: "low"
                }
            ]
        }
    ];

    return (
        <div className="slide">
            <h1 className="slide-title">必要書類・計画詳細</h1>
            <div className="slide-content">
                <div className="docs-container">
                    {documentCategories.map((category, catIdx) => (
                        <div key={catIdx} className="doc-category">
                            <div className="category-header" style={{ borderLeft: `4px solid ${category.color}` }}>
                                <span style={{ color: category.color }}>{category.icon}</span>
                                <h3>{category.category}</h3>
                            </div>
                            <div className="category-documents">
                                {category.documents.map((doc, docIdx) => (
                                    <div key={docIdx} className={`doc-card priority-${doc.priority}`}>
                                        <div className="doc-card-header">
                                            <h4>{doc.name}</h4>
                                            {doc.deadline && (
                                                <span className="deadline-badge">
                                                    <Calendar size={12} />
                                                    期限: {doc.deadline}
                                                </span>
                                            )}
                                            {doc.budget && (
                                                <span className="budget-badge">
                                                    <DollarSign size={12} />
                                                    予算: {doc.budget}
                                                </span>
                                            )}
                                        </div>
                                        <p className="doc-description">{doc.description}</p>

                                        {doc.items && (
                                            <ul className="doc-items">
                                                {doc.items.map((item, i) => (
                                                    <li key={i}>
                                                        <CheckCircle size={14} color="#10b981" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {doc.breakdown && (
                                            <table className="breakdown-table">
                                                <thead>
                                                    <tr>
                                                        <th>項目</th>
                                                        <th>金額</th>
                                                        <th>状況</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {doc.breakdown.map((row, i) => (
                                                        <tr key={i}>
                                                            <td>{row.item}</td>
                                                            <td>{row.amount}</td>
                                                            <td>
                                                                <span className={`status-tag ${row.status === '済' || row.status === '予定' ? 'done' : 'pending'}`}>
                                                                    {row.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}

                                        {doc.保管場所 && (
                                            <div className="storage-info">
                                                <Archive size={14} />
                                                <span>{doc.保管場所}</span>
                                            </div>
                                        )}

                                        <div className="doc-footer">
                                            <span className={`status-badge ${doc.status === '要作成' || doc.status === '要確認' || doc.status === '随時収集' ? 'warning' : 'info'}`}>
                                                {doc.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .docs-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .doc-category {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    border: 1px solid var(--card-border);
                    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05);
                }
                .category-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.25rem;
                    padding-bottom: 0.75rem;
                }
                .category-header h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }
                .category-documents {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 1.25rem;
                }
                .doc-card {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 1.25rem;
                    border: 1px solid #e2e8f0;
                    transition: all 0.2s ease;
                }
                .doc-card:hover {
                    border-color: var(--accent-primary);
                    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
                }
                .doc-card.priority-high {
                    border-left: 3px solid #ef4444;
                }
                .doc-card.priority-medium {
                    border-left: 3px solid #f59e0b;
                }
                .doc-card.priority-low {
                    border-left: 3px solid #10b981;
                }
                .doc-card-header {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 0.5rem;
                }
                .doc-card-header h4 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    flex: 1;
                }
                .deadline-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .budget-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .doc-description {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    margin: 0 0 1rem;
                    line-height: 1.5;
                }
                .doc-items {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 1rem;
                }
                .doc-items li {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.5rem;
                    padding: 0.35rem 0;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }
                .breakdown-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 1rem;
                    font-size: 0.85rem;
                }
                .breakdown-table th,
                .breakdown-table td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                }
                .breakdown-table th {
                    background: #f1f5f9;
                    font-weight: 600;
                    color: var(--text-secondary);
                    font-size: 0.75rem;
                }
                .status-tag {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .status-tag.done {
                    background: rgba(16, 185, 129, 0.15);
                    color: #10b981;
                }
                .status-tag.pending {
                    background: rgba(148, 163, 184, 0.15);
                    color: #64748b;
                }
                .storage-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    background: rgba(148, 163, 184, 0.1);
                    border-radius: 8px;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                }
                .doc-footer {
                    display: flex;
                    justify-content: flex-end;
                }
                .status-badge {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .status-badge.warning {
                    background: rgba(245, 158, 11, 0.15);
                    color: #f59e0b;
                }
                .status-badge.info {
                    background: rgba(139, 92, 246, 0.15);
                    color: #8b5cf6;
                }
            `}</style>
        </div>
    );
};

export default DocumentsSlide;
