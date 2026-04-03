import React, { useState } from 'react';
import {
    ClipboardList,
    CreditCard,
    Plane,
    FileText,
    Receipt,
    ArrowRight,
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    User,
    Building,
    FileCheck,
    Wallet
} from 'lucide-react';

const TravelFlowSlide = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 'plan',
            icon: <ClipboardList size={32} />,
            title: '1. 出張計画・申請',
            subtitle: '出発の1週間前まで',
            color: '#4f46e5',
            content: {
                summary: '出張の目的・期間・訪問先を明確にし、事前に承認を得ることが重要です。',
                sections: [
                    {
                        title: '必須提出物',
                        items: [
                            { icon: <FileText size={18} />, text: '出張申請書（所定フォーマット）', detail: '目的・期間・訪問先・概算費用を記載' },
                            { icon: <Calendar size={18} />, text: '出張スケジュール案', detail: '訪問先ごとの日時・面談相手' },
                            { icon: <Wallet size={18} />, text: '予算見込額', detail: '旅費・宿泊費・その他経費の概算' }
                        ]
                    },
                    {
                        title: '承認プロセス',
                        items: [
                            { icon: <User size={18} />, text: '上長承認', detail: 'Slackで申請書共有→承認反応' },
                            { icon: <Building size={18} />, text: '団体・関係機関への事前連絡', detail: '訪問先へのアポイントメント' },
                            { icon: <CheckCircle size={18} />, text: '最終確認', detail: '予算残額・日程の最終確認' }
                        ]
                    }
                ],
                warnings: [
                    '突発的な出張でも、必ず出発前に承認を得ること',
                    '予算残額は必ず事前に確認すること',
                    '海外出張の場合はさらに早期の申請が必要'
                ]
            }
        },
        {
            id: 'travel',
            icon: <Plane size={32} />,
            title: '2. 出張実施中',
            subtitle: '証憑書類の確保が最重要',
            color: '#0ea5e9',
            content: {
                summary: '出張中の全ての活動が証拠として残せるよう、証憑書類を確実に保管してください。',
                sections: [
                    {
                        title: '交通費・宿泊費の証憑',
                        items: [
                            { icon: <Receipt size={18} />, text: '領収書（原本）', detail: '宛名「スグクル株式会社」必須。但し書きも具体的に' },
                            { icon: <FileText size={18} />, text: '公共交通機関利用明細', detail: '駅ネット・航空会社の利用明細' },
                            { icon: <FileText size={18} />, text: '搭乗券半券（原本）', detail: '飛行機利用の場合は必ず保管' },
                            { icon: <FileText size={18} />, text: '宿泊費の明細書', detail: '朝食込み等の記載があるもの' }
                        ]
                    },
                    {
                        title: '活動記録の確保',
                        items: [
                            { icon: <FileText size={18} />, text: '訪問先・面談相手の記録', detail: '日時・氏名・所属・連絡先' },
                            { icon: <FileText size={18} />, text: '打合せ内容のメモ', detail: '議題・協議内容・決定事項' },
                            { icon: <FileText size={18} />, text: '写真撮影', detail: '訪問先・活動風景を撮影' },
                            { icon: <FileText size={18} />, text: '名刺・資料の受領', detail: '頂戴した資料は持ち帰る' }
                        ]
                    }
                ],
                warnings: [
                    '領収書がない場合は支払証明書が必要',
                    '電子領収書も印刷して保管すること',
                    '全ての証憑は原本を保管すること（コピー不可）'
                ]
            }
        },
        {
            id: 'report',
            icon: <FileText size={32} />,
            title: '3. 帰任・報告',
            subtitle: '帰任後3営業日以内',
            color: '#8b5cf6',
            content: {
                summary: '出張後は速やかに報告書を作成し、チーム全体で情報を共有します。',
                sections: [
                    {
                        title: '報告書作成',
                        items: [
                            { icon: <FileText size={18} />, text: '出張報告書（Sugu-Group所定フォーマット）', detail: '行程・活動内容・成果を記載' },
                            { icon: <FileText size={18} />, text: '復命書', detail: '上司への完了報告' },
                            { icon: <FileText size={18} />, text: '成果物の整理', detail: '収集した資料・データの整理' }
                        ]
                    },
                    {
                        title: '共有事項',
                        items: [
                            { icon: <CheckCircle size={18} />, text: '本次の成果', detail: '得られた成果・得られた情報' },
                            { icon: <AlertCircle size={18} />, text: '課題・次回への改善点', detail: 'うまくいかなかった点・改善案' },
                            { icon: <User size={18} />, text: '関係者へのフィードバック', detail: '必要に応じて関連メンバーへ共有' }
                        ]
                    }
                ],
                warnings: [
                    '報告書は必ず期限内（3営業日以内）に提出すること',
                    '未完了事項があれば明記し、対策を記載すること'
                ]
            }
        },
        {
            id: 'settle',
            icon: <Receipt size={32} />,
            title: '4. 経費精算',
            subtitle: '月末締め',
            color: '#10b981',
            content: {
                summary: '経費は毎月月末で締め、経理へ精算します。補助金監査のため、書類の正確性が重要です。',
                sections: [
                    {
                        title: '精算手続き',
                        items: [
                            { icon: <Receipt size={18} />, text: '全ての領収書・明細書原本を提出', detail: '日付・金額・宛名・但しの確認' },
                            { icon: <FileText size={18} />, text: '経費精算書の作成', detail: '費目ごとの集計' },
                            { icon: <Wallet size={18} />, text: '仮払い金の精算', detail: '立替払いの場合は支払依頼' }
                        ]
                    },
                    {
                        title: '証憑チェック',
                        items: [
                            { icon: <CheckCircle size={18} />, text: '日付・金额の整合性', detail: '出張期間と合致するか確認' },
                            { icon: <CheckCircle size={18} />, text: '宛名の確認', detail: '「スグクル株式会社」があるか' },
                            { icon: <CheckCircle size={18} />, text: '但しの記載', detail: '何のためか具体的に記載' }
                        ]
                    }
                ],
                warnings: [
                    '補助金監査のため、書類不備は厳禁です',
                    '不明瞭な経費は精算できない場合があります',
                    '帳簿は原則5年間保管が必要です'
                ]
            }
        }
    ];

    return (
        <div className="slide">
            <h1 className="slide-title">出張申請・実施フロー詳細</h1>
            <div className="slide-content flow-container">
                <div className="flow-steps">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`flow-card ${index === activeStep ? 'active' : ''}`}
                            onClick={() => setActiveStep(index)}
                            style={{ '--step-color': step.color }}
                        >
                            <div className="icon-wrapper" style={{ background: index === activeStep ? step.color : '#f1f5f9', color: index === activeStep ? 'white' : step.color }}>
                                {step.icon}
                            </div>
                            <div className="step-header">
                                <h3>{step.title}</h3>
                                <p className="step-subtitle">{step.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="detail-panel">
                    <div className="panel-header" style={{ borderLeft: `4px solid ${steps[activeStep].color}`, paddingLeft: '1rem' }}>
                        <div style={{ color: steps[activeStep].color, marginRight: '0.5rem' }}>{steps[activeStep].icon}</div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{steps[activeStep].title}</h2>
                            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{steps[activeStep].content.summary}</p>
                        </div>
                    </div>

                    <div className="panel-body">
                        {steps[activeStep].content.sections.map((section, idx) => (
                            <div key={idx} className="content-section">
                                <h4>{section.title}</h4>
                                <ul className="detail-list">
                                    {section.items.map((item, i) => (
                                        <li key={i}>
                                            <div className="item-main">
                                                <span className="item-icon">{item.icon}</span>
                                                <span className="item-text">{item.text}</span>
                                            </div>
                                            <span className="item-detail">{item.detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {steps[activeStep].content.warnings.length > 0 && (
                            <div className="warnings-section">
                                <h4><AlertCircle size={16} /> 注意사항</h4>
                                <ul className="warnings-list">
                                    {steps[activeStep].content.warnings.map((warning, i) => (
                                        <li key={i}>{warning}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flow-guidance">
                        <AlertCircle size={18} />
                        <span>各フェーズをクリックして詳細を確認してください</span>
                    </div>
                </div>
            </div>

            <style>{`
                .flow-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    padding: 1.5rem !important;
                }

                .flow-steps {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
                }

                .flow-card {
                    flex: 1;
                    background: white;
                    border: 1px solid var(--card-border);
                    padding: 1.25rem 1rem;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }

                .flow-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                }

                .flow-card.active {
                    border-color: var(--step-color);
                    box-shadow: 0 0 0 2px var(--step-color);
                }

                .icon-wrapper {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 0.75rem;
                    transition: all 0.3s ease;
                }

                .step-header h3 {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0 0 0.25rem;
                }

                .step-subtitle {
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .detail-panel {
                    flex: 1;
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    border: 1px solid var(--card-border);
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .panel-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                }

                .panel-body {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .content-section h4 {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0 0 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #f1f5f9;
                }

                .detail-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }

                .detail-list li {
                    background: #f8fafc;
                    padding: 1rem;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }

                .item-main {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .item-icon {
                    color: var(--accent-primary);
                }

                .item-text {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: var(--text-primary);
                }

                .item-detail {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    padding-left: 1.5rem;
                }

                .warnings-section {
                    background: #fef2f2;
                    padding: 1rem 1.25rem;
                    border-radius: 12px;
                    border-left: 4px solid var(--danger);
                }

                .warnings-section h4 {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--danger);
                    font-size: 0.95rem;
                    font-weight: 700;
                    margin: 0 0 0.75rem;
                }

                .warnings-list {
                    margin: 0;
                    padding-left: 1.25rem;
                    color: var(--danger);
                    font-size: 0.9rem;
                }

                .warnings-list li {
                    margin-bottom: 0.25rem;
                }

                .flow-guidance {
                    margin-top: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    padding-top: 1rem;
                    border-top: 1px solid #f1f5f9;
                }

                @media (max-width: 1024px) {
                    .detail-list {
                        grid-template-columns: 1fr;
                    }
                    .flow-steps {
                        flex-wrap: wrap;
                    }
                    .flow-card {
                        flex: 1 1 45%;
                    }
                }
            `}</style>
        </div>
    );
};

export default TravelFlowSlide;
