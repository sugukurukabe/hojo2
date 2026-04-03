import React from 'react';
import { Calendar, CheckCircle2, MapPin, Users, FileText, MoneyDown } from 'lucide-react';

const ScheduleSlide = () => {
    const phases = [
        {
            phase: "フェーズ1",
            date: "2025年 12月",
            title: "事業開始・交付決定",
            status: "completed",
            items: [
                { icon: <FileText size={16} />, text: "交付決定通知の受領（12月上旬）" },
                { icon: <Users size={16} />, text: "インドネシア特定技能人材受入準備の開始" },
                { icon: <MapPin size={16} />, text: "初回出張計画の作成（桐原：鹿児島方面）" },
                { icon: <FileText size={16} />, text: "パンフレット作成（33万円）- 発注・制作完了" }
            ]
        },
        {
            phase: "フェーズ2",
            date: "2026年 1月31日",
            title: "事業遂行状況報告",
            status: "current",
            items: [
                { icon: <FileText size={16} />, text: "別記様式第5号（事業遂行状況報告書）の作成・提出" },
                { icon: <MoneyDown size={16} />, text: "12月末までの経費執行報告（旅費・広報費）" },
                { icon: <Users size={16} />, text: "活動実績のとりまとめ（出張記録・広報活動）" },
                { icon: <MapPin size={16} />, text: "桐原：鹿児島出張報告（12月10日）の提出" }
            ]
        },
        {
            phase: "フェーズ3",
            date: "2026年 2月〜3月中旬",
            title: "事業本格実施・旅費消化",
            status: "upcoming",
            items: [
                { icon: <MapPin size={16} />, text: "神戸方面への出張実施（複数回計画中）" },
                { icon: <MapPin size={16} />, text: "吉原方面的への出張実施" },
                { icon: <Users size={16} />, text: "その他の出張（対象者：要相談）" },
                { icon: <FileText size={16} />, text: "フライヤー作成（40万円）- 制作・配布開始" },
                { icon: <FileText size={16} />, text: "研修費（36万円）の執行計画策定" }
            ]
        },
        {
            phase: "フェーズ4",
            date: "2026年 3月31日",
            title: "事業完了・実績報告",
            status: "upcoming",
            items: [
                { icon: <MoneyDown size={16} />, text: "全経費の支払完了（旅費500万円枠の消化）" },
                { icon: <FileText size={16} />, text: "別記様式第7号（実績報告書）の作成・提出" },
                { icon: <FileText size={16} />, text: "証憑書類（領収書・明細書等）の整理・保管" },
                { icon: <FileText size={16} />, text: "財産管理台帳（別記様式第10号）の作成" },
                { icon: <CheckCircle2 size={16} />, text: "事業完了確認・監査対応準備" }
            ]
        }
    ];

    return (
        <div className="slide">
            <h1 className="slide-title">事業スケジュール詳細</h1>
            <div className="slide-content">
                <div className="schedule-grid">
                    {phases.map((phase, index) => (
                        <div key={index} className={`schedule-card ${phase.status}`}>
                            <div className="card-header">
                                <span className="phase-badge">{phase.phase}</span>
                                <span className={`status-badge ${phase.status}`}>
                                    {phase.status === 'completed' && '完了'}
                                    {phase.status === 'current' && '現在'}
                                    {phase.status === 'upcoming' && '予定'}
                                </span>
                            </div>
                            <h3 className="card-title">{phase.title}</h3>
                            <p className="card-date">{phase.date}</p>
                            <ul className="card-items">
                                {phase.items.map((item, i) => (
                                    <li key={i}>
                                        <span className="item-icon">{item.icon}</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .schedule-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                }
                .schedule-card {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    border: 1px solid var(--card-border);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }
                .schedule-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
                .schedule-card.current {
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 2px var(--accent-glow);
                }
                .schedule-card.completed {
                    background: linear-gradient(to bottom right, white, #f0fdf4);
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .phase-badge {
                    background: #f1f5f9;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                }
                .status-badge {
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                }
                .status-badge.completed {
                    background: rgba(34, 197, 94, 0.15);
                    color: var(--success);
                }
                .status-badge.current {
                    background: rgba(79, 70, 229, 0.15);
                    color: var(--accent-primary);
                }
                .status-badge.upcoming {
                    background: rgba(148, 163, 184, 0.15);
                    color: var(--text-secondary);
                }
                .card-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.25rem;
                }
                .card-date {
                    font-size: 0.9rem;
                    color: var(--accent-secondary);
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                .card-items {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .card-items li {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.5rem;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.4;
                }
                .card-items li:last-child {
                    border-bottom: none;
                }
                .item-icon {
                    color: var(--accent-primary);
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                @media (max-width: 1200px) {
                    .schedule-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .schedule-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ScheduleSlide;
