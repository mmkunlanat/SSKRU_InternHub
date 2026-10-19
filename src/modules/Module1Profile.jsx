import React, { useState } from 'react';
import {
  User,
  Building2,
  Save,
  CheckCircle,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';

export default function Module1Profile({ studentData, companyData, onUpdateStudent, onUpdateCompany, currentRole }) {
  const [studentForm, setStudentForm] = useState(studentData);
  const [companyForm, setCompanyForm] = useState(companyData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const canEdit = currentRole === 'student' || currentRole === 'admin';

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateStudent(studentForm);
    onUpdateCompany(companyForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 1 (ส่วนที่ 1)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>FR-1.1 & FR-1.2</span>
        </div>
        <h2 className="hero-title">ข้อมูลเกี่ยวกับนักศึกษาและหน่วยงาน</h2>
        <p className="hero-subtitle">
          บันทึกและตรวจสอบประวัตินักศึกษา ข้อมูลสถานประกอบการฝึกงาน และรายละเอียดพนักงานที่ปรึกษา (Job Supervisor)
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">{studentForm.id}</span>
            <span className="hero-stat-label">รหัสประจำตัวนักศึกษา</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">{studentForm.degreeLevel}</span>
            <span className="hero-stat-label">ระดับการศึกษา</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">4 เดือน</span>
            <span className="hero-stat-label">ระยะเวลาฝึกปฏิบัติงาน</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--sskru-gold-light)' }}>
              {studentForm.status}
            </span>
            <span className="hero-stat-label">สถานะปัจจุบัน</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert-box alert-success" style={{ animation: 'fadeIn 200ms ease' }}>
          <CheckCircle size={20} />
          <div><strong>บันทึกสำเร็จ!</strong> ข้อมูลนักศึกษาและสถานประกอบการได้รับการอัปเดตเรียบร้อยแล้ว</div>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="grid-2">
          {/* FR-1.1 Student Info Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-1.1 ข้อมูลนักศึกษา (Student Profile)</h3>
                  <p className="card-subtitle">ข้อมูลการศึกษาและช่องทางการติดต่อ</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    คำนำหน้า - ชื่อ - นามสกุล <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={studentForm.fullName}
                    disabled={!canEdit}
                    onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    รหัสนักศึกษา <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={studentForm.id}
                    disabled={!canEdit}
                    onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    ระดับการศึกษา <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={studentForm.degreeLevel}
                    disabled={!canEdit}
                    onChange={(e) => setStudentForm({ ...studentForm, degreeLevel: e.target.value })}
                  >
                    <option value="ปริญญาตรี 4 ปี">ปริญญาตรี 4 ปี</option>
                    <option value="ปริญญาตรีเทียบโอน (2 ปีหลัง)">ปริญญาตรีเทียบโอน (2 ปีหลัง)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    สาขาวิชา <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={studentForm.major}
                    disabled={!canEdit}
                    onChange={(e) => setStudentForm({ ...studentForm, major: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  คณะและมหาวิทยาลัย
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={`${studentForm.faculty} ${studentForm.university}`}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  ที่อยู่ปัจจุบัน / ที่พักระหว่างฝึกงาน <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={studentForm.address}
                  disabled={!canEdit}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    เบอร์โทรศัพท์ <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    value={studentForm.phone}
                    disabled={!canEdit}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    E-mail สำหรับติดต่อ <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={studentForm.email}
                    disabled={!canEdit}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="alert-box alert-info" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                <Calendar size={18} style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.84rem' }}>
                  <strong>อาจารย์นิเทศประจำตัว:</strong> {studentForm.advisorName} ({studentForm.advisorEmail})
                </div>
              </div>
            </div>
          </div>

          {/* FR-1.2 Company Info Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge" style={{ background: 'var(--sskru-purple)', color: '#fff' }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-1.2 ข้อมูลสถานประกอบการ (Workplace Profile)</h3>
                  <p className="card-subtitle">ข้อมูลหน่วยงานและพนักงานที่ปรึกษา</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label className="form-label">
                  ชื่อหน่วยงาน / บริษัท <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={companyForm.companyName}
                  disabled={!canEdit}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  ที่อยู่สถานประกอบการ <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={companyForm.address}
                  disabled={!canEdit}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    ชื่อพนักงานที่ปรึกษา (Job Supervisor) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyForm.supervisorName}
                    disabled={!canEdit}
                    onChange={(e) => setCompanyForm({ ...companyForm, supervisorName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    แผนก / ฝ่ายงาน <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyForm.department}
                    disabled={!canEdit}
                    onChange={(e) => setCompanyForm({ ...companyForm, department: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    E-mail พนักงานที่ปรึกษา <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={companyForm.email}
                    disabled={!canEdit}
                    onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    เบอร์โทรศัพท์ / ต่อแผนก <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyForm.phone}
                    disabled={!canEdit}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  ลักษณะสินค้า / บริการของสถานประกอบการ <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={companyForm.productsServices}
                  disabled={!canEdit}
                  onChange={(e) => setCompanyForm({ ...companyForm, productsServices: e.target.value })}
                  placeholder="ระบุลักษณะการดำเนินธุรกิจ เช่น ให้บริการซอฟต์แวร์, ผลิตชิ้นส่วนอิเล็กทรอนิกส์ ฯลฯ"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">รูปแบบการปฏิบัติงาน</label>
                <input
                  type="text"
                  className="form-input"
                  value={companyForm.workLocationType}
                  disabled={!canEdit}
                  onChange={(e) => setCompanyForm({ ...companyForm, workLocationType: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {canEdit && (
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
              <Save size={18} /> บันทึกข้อมูลส่วนที่ 1
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
