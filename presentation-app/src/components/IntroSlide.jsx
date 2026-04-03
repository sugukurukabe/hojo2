import React from 'react';
import { Sprout, TrendingUp, FileCheck } from 'lucide-react';

const IntroSlide = () => {
    return (
        <div className="slide">
            <h1 className="slide-title">補助事業実施計画</h1>
            <div className="slide-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    スマート農業・農業支援サービス<br />導入総合サポート緊急対策事業
                </h2>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '4rem' }}>
                    本プロジェクトは2026年3月31日の完了を目指し、スマート農業技術の導入と普及を促進します。
                    チーム全体で進捗を共有し、確実に補助金を獲得するためのロードマップです。
                </p>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <FeatureCard
                        icon={<Sprout size={40} color="var(--accent-secondary)" />}
                        title="事業目的"
                        desc="農業支援サービスの導入により、地域の農業課題を解決し、生産性を向上させる。"
                    />
                    <FeatureCard
                        icon={<TrendingUp size={40} color="var(--accent-primary)" />}
                        title="予算管理"
                        desc="500万円の旅費予算と75万円の広報費を適切に執行・管理する。"
                    />
                    <FeatureCard
                        icon={<FileCheck size={40} color="#eab308" />}
                        title="報告義務"
                        desc="1月の遂行状況報告と3月の実績報告を遅滞なく完了する。"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        width: '300px',
        border: '1px solid var(--card-border)',
        textAlign: 'left',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}>
        <div style={{ marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{desc}</p>
    </div>
);

export default IntroSlide;
