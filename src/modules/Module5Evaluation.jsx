import React, { useState } from 'react';
import {
  Star,
  Lock,
  EyeOff,
  CheckCircle,
  Save,
  Award,
  Briefcase,
  HelpCircle,
  TrendingUp,
  FileCheck2,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function Module5Evaluation({
  evaluationData,
  onUpdateEvaluation,
  currentRole,
  studentData
}) {
  const [data, setData] = useState(evaluationData);
  const [activeCategory, setActiveCategory] = useState("all");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const canEdit = currentRole === 'supervisor' || currentRole === 'admin';
  const isStudent = currentRole === 'student';

  const handleScoreChange = (id, newScore) => {
    const updatedScores = data.scores.map((item) =>
      item.id === id ? { ...item, score: parseInt(newScore, 10) } : item
    );
    const total = updatedScores.reduce((acc, curr) => acc + curr.score, 0);
    
    let grade = "A";
    const pct = (total / 120) * 100;
    if (pct < 50) grade = "E";
    else if (pct < 60) grade = "D";
    else if (pct < 70) grade = "C";
    else if (pct < 80) grade = "B";

    setData({
      ...data,
      scores: updatedScores,
      totalScore: total,
      gradeEquivalent: grade
    });
  };

  const handleSave = () => {
    onUpdateEvaluation(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const categories = [
    "all",
    "หมวดที่ 1: ผลสำเร็จของงาน",
    "หมวดที่ 2: ความรู้ความสามารถ",
    "หมวดที่ 3: ความรับผิดชอบต่อหน้าที่",
    "หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์"
  ];

  const filteredScores = activeCategory === "all"
    ? data.scores
    : data.scores.filter((s) => s.category === activeCategory);

  const totalScoreMax = 120;
  const scorePercent = ((data.totalScore / totalScoreMax) * 100).toFixed(1);

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 5 (ส่วนที่ 5)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>สำหรับพนักงานที่ปรึกษา (Supervisor)</span>
        </div>
        <h2 className="hero-title">แบบประเมินผลการฝึกงานและสหกิจศึกษา (24 ข้อ)</h2>
        <p className="hero-subtitle">
          แบบประเมินผลออนไลน์ 4 หมวด ความคิดเห็นเชิงคุณภาพ การนำผลงานไปใช้ประโยชน์ และระบบรักษาความลับ (Confidential Lock)
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">
              {isStudent && data.isConfidentialLocked ? "🔒 ความลับ" : `${data.totalScore} / ${totalScoreMax}`}
            </span>
            <span className="hero-stat-label">คะแนนรวม (24 ข้อ)</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">
              {isStudent && data.isConfidentialLocked ? "ผ่านเกณฑ์ดีเยี่ยม" : `${scorePercent}%`}
            </span>
            <span className="hero-stat-label">ร้อยละผลการประเมิน</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--sskru-gold-light)' }}>
              เกรด {data.gradeEquivalent}
            </span>
            <span className="hero-stat-label">เกรดที่คาดว่าจะได้รับ</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--success)' }}>
              ประเมินเรียบร้อย ✓
            </span>
            <span className="hero-stat-label">สถานะการประเมิน</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="alert-box alert-success" style={{ animation: 'fadeIn 200ms ease' }}>
          <CheckCircle size={20} />
          <div><strong>บันทึกสำเร็จ!</strong> ผลการประเมิน 24 ข้อได้รับการบันทึกอย่างปลอดภัยแล้ว</div>
        </div>
      )}

      {/* FR-5.4 Confidential Lock Banner for Student */}
      {isStudent && data.isConfidentialLocked ? (
        <div className="confidential-banner">
          <div className="confidential-banner-icon">
            <Lock size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                FR-5.4 ระบบความลับของผลการประเมิน (Confidential Lock Active)
              </h3>
              <span className="badge badge-warning">ระบบความลับ</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
              ตามข้อบังคับของศูนย์ฝึกประสบการณ์วิชาชีพฯ คะแนนประเมินดิบรายข้อและความคิดเห็นเชิงลึกของพนักงานที่ปรึกษาจะถูกเก็บรักษาเป็นความลับ 
              นักศึกษาจะทราบเฉพาะสถานะภาพรวมและเกรดเฉลี่ยเพื่อความเป็นธรรมและความน่าเชื่อถือในการประเมิน
            </p>
            <div style={{ marginTop: '0.85rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                <CheckCircle size={15} /> สรุปผล: ผ่านการประเมินตามเกณฑ์มาตรฐาน (เกรด {data.gradeEquivalent})
              </span>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                ประเมินโดย {data.evaluatedBy} ({data.evaluatedDate})
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Content Area (Blurred or hidden if student and locked) */}
      <div className={`confidential-card ${isStudent && data.isConfidentialLocked ? 'confidential-blur' : ''}`}>
        {/* Category Filters */}
        <div className="tabs-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span>{cat === 'all' ? '📋 แสดงครบทั้ง 24 ข้อ' : cat}</span>
            </button>
          ))}
        </div>

        {/* 24-Questions Table */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Star size={20} />
              </div>
              <div>
                <h3 className="card-title">FR-5.1 รายการประเมินผล 24 ข้อ (4 หมวด)</h3>
                <p className="card-subtitle">เกณฑ์การให้คะแนน 1-5 (5 = ดีเยี่ยม, 1 = ต้องปรับปรุง)</p>
              </div>
            </div>
            <span className="badge badge-purple">{data.totalScore} / 120 คะแนน</span>
          </div>

          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>ข้อที่</th>
                    <th>เกณฑ์การประเมิน</th>
                    <th style={{ width: '220px' }}>หมวดหมู่</th>
                    <th style={{ width: '220px', textAlign: 'center' }}>คะแนนประเมิน (1 - 5)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScores.map((item) => (
                    <tr key={item.id}>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.id}</td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {item.category.split(':')[1]}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={item.score}
                            disabled={!canEdit}
                            onChange={(e) => handleScoreChange(item.id, e.target.value)}
                            style={{ width: '110px', accentColor: 'var(--primary)' }}
                          />
                          <span style={{ fontWeight: 700, width: '35px', textAlign: 'center', color: 'var(--primary)' }}>
                            {item.score} / 5
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FR-5.2 Qualitative Feedback & FR-5.3 Utilization */}
        <div className="grid-2">
          {/* Qualitative Feedback */}
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge" style={{ background: 'var(--sskru-purple)', color: '#fff' }}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-5.2 ความคิดเห็นเชิงคุณภาพ</h3>
                  <p className="card-subtitle">จุดเด่น ข้อปรับปรุง และความสนใจรับเข้าทำงาน</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label className="form-label">1. จุดเด่นและข้อดีของนักศึกษา</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={data.strengths}
                  disabled={!canEdit}
                  onChange={(e) => setData({ ...data, strengths: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">2. ข้อควรปรับปรุงและพัฒนาเพิ่มเติม</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={data.improvements}
                  disabled={!canEdit}
                  onChange={(e) => setData({ ...data, improvements: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">3. ความสนใจรับเข้าทำงานหลังสำเร็จการศึกษา</label>
                <select
                  className="form-select"
                  value={data.jobOfferInterest}
                  disabled={!canEdit}
                  onChange={(e) => setData({ ...data, jobOfferInterest: e.target.value })}
                >
                  <option value="ยินดีรับเข้าทำงานทันที (High Priority Job Offer)">
                    ⭐ ยินดีรับเข้าทำงานทันที (High Priority Job Offer)
                  </option>
                  <option value="ยินดีรับไว้พิจารณาเป็นกรณีพิเศษ">
                    👍 ยินดีรับไว้พิจารณาเป็นกรณีพิเศษ
                  </option>
                  <option value="ขึ้นอยู่กับตำแหน่งงานว่างในอนาคต">
                    ⏳ ขึ้นอยู่กับตำแหน่งงานว่างในอนาคต
                  </option>
                  <option value="ยังไม่พิจารณารับเข้าทำงาน">
                    ยังไม่พิจารณารับเข้าทำงาน
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">4. สรุปภาพรวมคุณภาพการฝึกงาน</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.overallQualitySummary}
                  disabled={!canEdit}
                  onChange={(e) => setData({ ...data, overallQualitySummary: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* FR-5.3 Result Utilization */}
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge" style={{ background: 'var(--sskru-gold)', color: '#fff' }}>
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-5.3 การใช้ประโยชน์จากผลงาน</h3>
                  <p className="card-subtitle">ประโยชน์ที่สถานประกอบการได้รับจริงจากการปฏิบัติงาน</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="alert-box alert-info" style={{ marginBottom: '1.25rem' }}>
                <CheckCircle size={20} />
                <div style={{ fontSize: '0.84rem' }}>
                  ข้อมูลนี้จะถูกนำไปใช้ประเมินผลกระทบเชิงบวก (Impact) ของโครงการสหกิจศึกษาต่อภาคธุรกิจ
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {data.utilizationAreas.map((area, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-app)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <CheckCircle size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      {area}
                    </span>
                  </div>
                ))}
              </div>

              {canEdit && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input
                      type="checkbox"
                      checked={data.isConfidentialLocked}
                      onChange={(e) => setData({ ...data, isConfidentialLocked: e.target.checked })}
                    />
                    <span>
                      <strong>FR-5.4 เปิดใช้งานระบบความลับ (Confidential Lock):</strong> ล็อกคะแนนดิบไม่ให้นักศึกษาเห็นโดยตรง
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {canEdit && (
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn btn-primary" onClick={handleSave} style={{ padding: '0.75rem 2rem' }}>
              <Save size={18} /> บันทึกผลการประเมิน 24 ข้อ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
