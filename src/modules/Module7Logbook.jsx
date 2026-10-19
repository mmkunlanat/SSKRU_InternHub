import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  Check,
  Send,
  UserCheck,
  Filter,
  Sparkles
} from 'lucide-react';

export default function Module7Logbook({
  logbookList,
  onAddLogbook,
  onApproveLogbook,
  currentRole
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // New Logbook Form State
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTask, setNewTask] = useState('');
  const [newMethod, setNewMethod] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newCategory, setNewCategory] = useState('ปัญหาด้านโค้ด (Code Bug)');
  const [newSolution, setNewSolution] = useState('');

  const canStudentAdd = currentRole === 'student';
  const canSupervisorApprove = currentRole === 'supervisor' || currentRole === 'admin';

  const categories = [
    'ปัญหาด้านโค้ด (Code Bug)',
    'สภาพแวดล้อมระบบ (Environment/Setup)',
    'ความต้องการระบบ (Requirements)',
    'การจัดการฐานข้อมูล (Database)',
    'การสื่อสารและกระบวนการ (Communication)'
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const dateObj = new Date(newDate);
    const dayOfWeek = dayNames[dateObj.getDay()];

    const newEntry = {
      id: `log-${Date.now()}`,
      date: newDate,
      day: dayOfWeek,
      assignedTask: newTask,
      methodProcedure: newMethod,
      problemEncountered: newProblem,
      problemCategory: newCategory,
      problemSolution: newSolution,
      status: 'pending',
      supervisorComment: '',
      approvedAt: null
    };

    onAddLogbook(newEntry);
    setNewTask('');
    setNewMethod('');
    setNewProblem('');
    setNewSolution('');
    setShowAddForm(false);
  };

  // FR-7.3 Problem Frequency Statistics calculation
  const problemStats = categories.map((cat) => {
    const count = logbookList.filter((item) => item.problemCategory === cat).length;
    return { category: cat, count };
  });

  const totalProblems = logbookList.length;
  const approvedCount = logbookList.filter((item) => item.status === 'approved').length;
  const pendingCount = logbookList.filter((item) => item.status === 'pending').length;

  const filteredLogs = filterCategory === 'all'
    ? logbookList
    : logbookList.filter((item) => item.problemCategory === filterCategory);

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 7 (ส่วนที่ 7)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>FR-7.1 ถึง FR-7.3</span>
        </div>
        <h2 className="hero-title">สมุดบันทึกการปฏิบัติงานรายวัน (Daily Logbook)</h2>
        <p className="hero-subtitle">
          บันทึกงานที่ได้รับมอบหมาย วิธีปฏิบัติ ปัญหาและแนวทางแก้ไข พร้อมระบบอนุมัติรายวันโดยพี่เลี้ยง และการวิเคราะห์สถิติปัญหา (FR-7.3)
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">{totalProblems} บันทึก</span>
            <span className="hero-stat-label">บันทึกงานสะสม</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--success)' }}>
              {approvedCount} รายการ
            </span>
            <span className="hero-stat-label">อนุมัติแล้ว (Approved)</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--warning)' }}>
              {pendingCount} รายการ
            </span>
            <span className="hero-stat-label">รอพี่เลี้ยงตรวจ</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">5 หมวด</span>
            <span className="hero-stat-label">การจำแนกประเภทปัญหา</span>
          </div>
        </div>
      </div>

      {/* FR-7.3 Problem Frequency Statistics Dashboard */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-app) 100%)' }}>
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon-badge" style={{ background: 'var(--sskru-purple)', color: '#fff' }}>
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="card-title">FR-7.3 ระบบประมวลผลสถิติปัญหาในการฝึกงาน</h3>
              <p className="card-subtitle">รวบรวมสถิติความถี่ของปัญหาเพื่อพัฒนาและปรับปรุงหลักสูตร</p>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="grid-2">
            {/* Visual Bar Chart */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
                📊 ความถี่ปัญหาจำแนกตามประเภท (Frequency by Category)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {problemStats.map((item, index) => {
                  const percentage = totalProblems > 0 ? ((item.count / totalProblems) * 100).toFixed(0) : 0;
                  const colors = ['#4f46e5', '#f59e0b', '#10b981', '#ec4899', '#06b6d4'];
                  const barColor = colors[index % colors.length];

                  return (
                    <div key={item.category}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 500 }}>{item.category}</span>
                        <span style={{ fontWeight: 600, color: barColor }}>
                          {item.count} ครั้ง ({percentage}%)
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: barColor,
                            borderRadius: 'var(--radius-full)',
                            transition: 'width 500ms ease'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights & Actions */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Sparkles size={18} color="var(--sskru-gold)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>บทวิเคราะห์เชิงคุณภาพสำหรับศูนย์ฝึกฯ</h4>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div>
                  • <strong>ปัญหาที่พบบ่อยที่สุด:</strong> ปัญหาด้านโค้ด (Code Bug) และการตั้งค่าสภาพแวดล้อม (Environment/Setup)
                </div>
                <div>
                  • <strong>แนวทางพัฒนาหลักสูตร:</strong> เสนอแนะให้สาขาวิชาเพิ่มเนื้อหาภาคปฏิบัติเกี่ยวกับ Docker, CI/CD Pipeline และการดีบักโปรแกรมในสภาวะ Production ก่อนส่งนักศึกษาไปฝึกงาน
                </div>
                <div>
                  • <strong>ประสิทธิภาพการแก้ปัญหา:</strong> นักศึกษาสามารถแก้ไขปัญหาได้ด้วยตนเองร้อยละ 85 โดยปรึกษาที่ปรึกษาเฉพาะกรณีเชิงสถาปัตยกรรม
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Action & Filter Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>กรองตามหมวดหมู่:</span>
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: '240px' }}
          >
            <option value="all">ทั้งหมด ({totalProblems} รายการ)</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {canStudentAdd && (
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus size={16} /> {showAddForm ? "ปิดแบบฟอร์ม" : "FR-7.1 เพิ่มบันทึกงานประจำวัน"}
          </button>
        )}
      </div>

      {/* FR-7.1 Add Logbook Modal Form */}
      {showAddForm && (
        <div className="card" style={{ marginBottom: '1.5rem', border: '2px solid var(--primary)' }}>
          <div className="card-header">
            <h3 className="card-title">FR-7.1 บันทึกการปฏิบัติงานรายวันใหม่</h3>
          </div>
          <form onSubmit={handleAddSubmit}>
            <div className="card-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">วันที่ <span className="required">*</span></label>
                  <input
                    type="date"
                    className="form-input"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">หมวดหมู่ปัญหา (สำหรับวิเคราะห์ FR-7.3) <span className="required">*</span></label>
                  <select
                    className="form-select"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">งานที่ได้รับมอบหมาย <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="เช่น พัฒนาหน้าจอลงทะเบียนผู้ใช้ และทดสอบ Responsive"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">วิธีการปฏิบัติงาน / เครื่องมือที่ใช้ <span className="required">*</span></label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="เช่น ใช้ React และ CSS Grid ในการออกแบบ และใช้ Axios เรียก REST API"
                  value={newMethod}
                  onChange={(e) => setNewMethod(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">ปัญหาหรืออุปสรรคที่พบ</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="เช่น ข้อมูลในตารางโหลดช้าเมื่อมีเรคอร์ดเกิน 1,000 แถว"
                    value={newProblem}
                    onChange={(e) => setNewProblem(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">วิธีการแก้ไขปัญหาที่ดำเนินการ</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="เช่น ใช้ Virtualized List และทำ Pagination แบ่งหน้าละ 50 รายการ"
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                ยกเลิก
              </button>
              <button type="submit" className="btn btn-primary">
                <Plus size={16} /> บันทึกและส่งให้พี่เลี้ยงอนุมัติ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Logbook Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredLogs.map((entry) => (
          <div key={entry.id} className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  {entry.date} ({entry.day})
                </span>
                <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                  {entry.problemCategory}
                </span>
              </div>

              <div>
                {entry.status === 'approved' ? (
                  <span className="badge badge-success">
                    <CheckCircle size={14} /> อนุมัติแล้ว ({entry.approvedAt})
                  </span>
                ) : (
                  <span className="badge badge-warning">
                    <Clock size={14} /> รอพนักงานที่ปรึกษาอนุมัติ
                  </span>
                )}
              </div>
            </div>

            <div className="card-body">
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>งานที่ได้รับมอบหมาย:</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  {entry.assignedTask}
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>วิธีปฏิบัติงาน:</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  {entry.methodProcedure}
                </div>
              </div>

              {(entry.problemEncountered || entry.problemSolution) && (
                <div className="grid-2" style={{ backgroundColor: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--danger)' }}>
                      ⚠️ ปัญหาที่พบ:
                    </div>
                    <div style={{ fontSize: '0.84rem' }}>{entry.problemEncountered || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--success)' }}>
                      💡 วิธีแก้ไข:
                    </div>
                    <div style={{ fontSize: '0.84rem' }}>{entry.problemSolution || '-'}</div>
                  </div>
                </div>
              )}

              {/* Supervisor Feedback / Approval */}
              {entry.status === 'approved' && entry.supervisorComment && (
                <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', borderLeft: '3px solid var(--primary)', backgroundColor: 'var(--primary-light)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                    ความเห็นจากพนักงานที่ปรึกษา:
                  </div>
                  <div style={{ fontSize: '0.84rem', fontStyle: 'italic' }}>
                    "{entry.supervisorComment}"
                  </div>
                </div>
              )}
            </div>

            {/* FR-7.2 Supervisor Action Bar */}
            {canSupervisorApprove && entry.status === 'pending' && (
              <div className="card-footer" style={{ backgroundColor: 'var(--warning-bg)' }}>
                <span style={{ fontSize: '0.82rem', color: '#92400e', marginRight: 'auto' }}>
                  รายการนี้รอการตรวจรับรองประจำวัน
                </span>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => onApproveLogbook(entry.id, "ตรวจสอบและอนุมัติผ่านระบบเรียบร้อย")}
                >
                  <Check size={14} /> อนุมัติบันทึกประจำวันนี้ (FR-7.2)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
