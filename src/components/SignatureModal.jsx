import React, { useRef, useState, useEffect } from 'react';
import { PenTool, RotateCcw, Check, X } from 'lucide-react';

export default function SignatureModal({ isOpen, onClose, onSave, title = "ลงลายมือชื่อดิจิทัลรับรอง (Digital Signature)" }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // Set canvas resolution to match display size
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#1e1b4b'; // Deep blue/ink color
      clearCanvas();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSave = () => {
    if (!hasSignature) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon-badge">
              <PenTool size={20} />
            </div>
            <div>
              <h3 className="card-title">{title}</h3>
              <p className="card-subtitle">กรุณาวาดลายมือชื่อด้วยเมาส์หรือนิ้วสัมผัส</p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="card-body">
          <div className="alert-box alert-info" style={{ marginBottom: '1rem' }}>
            <div>
              <strong>คำชี้แจง:</strong> ลายมือชื่อนี้จะถูกนำไปผูกกับเอกสารการรับรองเวลาปฏิบัติงานและใบประกาศนียบัตรอย่างเป็นทางการ
            </div>
          </div>

          <div className="signature-box">
            <canvas
              ref={canvasRef}
              className="signature-canvas"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '14px',
              fontSize: '0.75rem',
              color: '#94a3b8',
              pointerEvents: 'none'
            }}>
              ✍️ พื้นที่ลงลายมือชื่อ (Sign here)
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button className="btn btn-secondary btn-sm" onClick={clearCanvas}>
            <RotateCcw size={14} /> ล้างลายเซ็น
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!hasSignature}
            style={{ opacity: hasSignature ? 1 : 0.6 }}
          >
            <Check size={16} /> ยืนยันและบันทึกลายมือชื่อ
          </button>
        </div>
      </div>
    </div>
  );
}
