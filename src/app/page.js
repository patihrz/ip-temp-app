'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';

// --- KOMPONEN BANTUAN ---
const FileIcon = ({ type }) => {
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('video/')) return '🎬';
  if (type.startsWith('audio/')) return '🎵';
  if (type === 'application/pdf') return '📄';
  if (type === 'application/zip' || type === 'application/x-rar-compressed') return '📦';
  return '📁';
};
const CheckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> );
const LoadingSpinner = () => ( <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div> );
const FastIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>);
const SecureIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>);
const PrivacyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const EasyUseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.563c0-1.036.84-1.875 1.875-1.875h.008c1.036 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875h-.008C9.84 12.188 9 11.348 9 10.313v-.75z" /></svg>);
const ShareIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 4.186m0-4.186c.018.157.025.315.025.474a2.25 2.25 0 01-4.5 0c0-.159.007-.317.025-.474m4.45 4.186l-2.096-1.152a2.25 2.25 0 00-2.354 0l-2.096 1.152m4.45-4.186l2.096-1.152a2.25 2.25 0 012.354 0l2.096 1.152m-4.45 4.186V19.5a2.25 2.25 0 002.25 2.25h.008a2.25 2.25 0 002.25-2.25v-2.096" /></svg>);
const CloudIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

const features = [
  { icon: <FastIcon />, title: "Unggah Super Cepat", text: "Upload langsung ke server Google Cloud untuk kecepatan maksimal tanpa menunggu lama." },
  { icon: <SecureIcon />, title: "Keamanan Terjamin", text: "Proses unggah dienkripsi dan file berbahaya secara otomatis diblokir." },
  { icon: <PrivacyIcon />, title: "Privasi Otomatis", text: "Tidak perlu khawatir, semua file akan dihapus permanen dari server setelah 3 jam." },
  { icon: <EasyUseIcon />, title: "Sangat Mudah Digunakan", text: "Antarmuka drag-and-drop yang intuitif, tidak perlu registrasi atau login." },
  { icon: <ShareIcon />, title: "Berbagi Instan", text: "Dapatkan link dan QR Code secara instan untuk dibagikan ke perangkat apa pun." },
  { icon: <CloudIcon />, title: "Andal & Stabil", text: "Didukung oleh infrastruktur Google Cloud yang terjamin uptime dan ketersediaannya." },
];

const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center flex flex-col items-center h-full">
    {icon}
    <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
    <p className="text-slate-400 text-sm">{text}</p>
  </div>
);

const blockedExtensions = [
  '.exe', '.vbs', '.scr', '.bat', '.com', '.pif', '.cmd', '.dll',
  '.php', '.phtml', '.py', '.pl', '.cgi', '.js', '.mjs', '.html', '.htm',
  '.xhtml', '.jse', '.jar', '.swf'
];

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [feedback, setFeedback] = useState({ message: '', type: 'info' });
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const urlInputRef = useRef(null);

  const BUCKET_NAME = 'temp-file-storage-d797d6'; 

  const resetState = () => {
    setFile(null);
    setIsUploading(false);
    setIsFetchingUrl(false);
    setUploadProgress(0);
    setDownloadUrl('');
    setFeedback({ message: '', type: 'info' });
  };

  const handleFileChange = (files) => {
    const selectedFile = files?.[0];
    if (!selectedFile) return;
    resetState();
    
    const fileExtension = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();
    if (blockedExtensions.includes(fileExtension)) {
      setFeedback({ message: 'Tipe file ini tidak diizinkan untuk diunggah.', type: 'error' });
      return;
    }

    if (selectedFile.size > 500 * 1024 * 1024) {
      setFeedback({ message: 'File terlalu besar! Maksimal 500MB.', type: 'error' });
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsFetchingUrl(true);
    setFeedback({ message: '', type: 'info' });
    setDownloadUrl('');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GENERATE_UPLOAD_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentType: file.type }),
      });
      setIsFetchingUrl(false);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Server error: ${res.status}`);
      }
      
      const { url, fileName } = await res.json();
      setIsUploading(true);
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.upload.onprogress = (e) => setUploadProgress(e.lengthComputable ? Math.round((e.loaded / e.total) * 100) : 0);
      xhr.onload = () => {
        if (xhr.status === 200) {
          const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;
          setDownloadUrl(publicUrl);
          setFeedback({ message: 'Upload sukses! Bagikan link di bawah ini.', type: 'success' });
          setFile(null);
        } else {
          throw new Error('Upload ke bucket gagal.');
        }
        setIsUploading(false);
      };
      xhr.onerror = () => {
        setIsUploading(false);
        setFeedback({ message: 'Kesalahan jaringan saat mengunggah.', type: 'error' });
      };
      xhr.send(file);
    } catch (error) {
      setIsFetchingUrl(false);
      setIsUploading(false);
      setFeedback({ message: `Gagal: ${error.message}`, type: 'error' });
    }
  };

  const handleCopy = () => {
    if (urlInputRef.current) {
        urlInputRef.current.select();
        document.execCommand('copy');
        setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleQrDownload = () => {
    const svg = document.getElementById("QrCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = 256; 
      canvas.height = 256;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 256, 256);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "IP_Temp_QR_Code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  
  const handleDragEvents = (e, dragging) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans items-center justify-start p-4 selection:bg-cyan-300 selection:text-cyan-900">
      <main className="w-full max-w-md pt-16 sm:pt-24">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
            <h1 className="text-5xl font-bold"><span className="text-cyan-400">IP</span> Temp</h1>
            <p className="text-slate-400 mt-2">File akan terhapus secara otomatis setelah 3 jam.</p>
        </motion.div>

        <motion.div layout className="rounded-lg bg-slate-800/50 p-6 border border-slate-700 backdrop-blur-sm shadow-2xl">
            <AnimatePresence mode="wait">
                {!file && !downloadUrl && (
                    <motion.div key="dropzone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} onDragEnter={(e) => handleDragEvents(e, true)} onDragLeave={(e) => handleDragEvents(e, false)} onDragOver={(e) => handleDragEvents(e, true)} onDrop={(e) => { handleDragEvents(e, false); handleFileChange(e.dataTransfer.files); }}>
                        <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-cyan-400 bg-slate-700' : 'border-slate-600 bg-slate-800 hover:bg-slate-700'}`}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                <p className="mb-2 text-sm text-slate-400"><span className="font-semibold text-cyan-400">Klik untuk memilih</span> atau seret file</p>
                                <p className="text-xs text-slate-500">Maksimal 500MB</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files)} />
                        </label>
                    </motion.div>
                )}
                {file && (
                     <motion.div key="file-preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                        <div className="flex items-center bg-slate-700 p-4 rounded-lg"><span className="text-4xl mr-4"><FileIcon type={file.type} /></span><div className="text-left overflow-hidden"><p className="font-bold truncate">{file.name}</p><p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p></div></div>
                        <motion.button onClick={handleUpload} disabled={isUploading || isFetchingUrl} className="mt-4 w-full px-4 py-3 font-bold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-500 disabled:bg-slate-600 transition-colors flex items-center justify-center" whileTap={{ scale: 0.98 }}>
                            {isFetchingUrl ? <LoadingSpinner/> : (isUploading ? `Mengunggah... ${uploadProgress}%` : 'Unggah Sekarang')}
                        </motion.button>
                     </motion.div>
                )}
                {downloadUrl && (
                     <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                        <div className="bg-white p-4 rounded-lg flex justify-center mb-4 transition-all hover:shadow-cyan-400/20 hover:shadow-2xl cursor-pointer" onClick={handleQrDownload}><QRCode id="QrCode" value={downloadUrl} size={128} bgColor="#FFFFFF" fgColor="#111827" /></div>
                         <button onClick={handleQrDownload} className="w-full text-sm text-cyan-400 hover:text-cyan-300 mb-4 transition-colors -mt-2">Download QR Code</button>
                         <div className="flex items-center space-x-2"><input ref={urlInputRef} type="text" readOnly value={downloadUrl} className="w-full px-3 py-2 text-slate-300 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none" /><button onClick={handleCopy} className="w-32 px-4 py-2 font-semibold text-white bg-slate-600 rounded-lg hover:bg-slate-500 transition-all flex justify-center items-center"><AnimatePresence mode="wait" initial={false}>{isCopied ? (<motion.span key="copied" initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} className="flex items-center gap-1"><CheckIcon/> Disalin!</motion.span>) : (<motion.span key="copy" initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}}>Salin</motion.span>)}</AnimatePresence></button></div>
                        <button onClick={resetState} className="mt-4 w-full text-cyan-400 hover:text-cyan-300 transition-colors">Unggah file lain</button>
                     </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
            {isUploading && !downloadUrl && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }} exit={{ height: 0, opacity: 0 }} className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden"><motion.div className="bg-cyan-400 h-2.5" initial={{ width: '0%' }} animate={{ width: `${uploadProgress}%` }} /></motion.div>
            )}
            </AnimatePresence>
             <AnimatePresence>
                {feedback.message && !isUploading && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`text-center text-sm mt-4 ${feedback.type === 'error' ? 'text-red-400' : 'text-cyan-400'}`}>{feedback.message}</motion.p>)}
             </AnimatePresence>
        </motion.div>
      </main>

      <motion.section className="w-full max-w-4xl mx-auto mt-24 sm:mt-32 px-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih <span className="text-cyan-400">IP Temp</span>?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (<motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}><FeatureCard {...feature} /></motion.div>))}
        </div>
      </motion.section>

      <footer className="w-full text-center text-slate-600 text-sm my-16"><p>IP Temp &copy; 2025</p></footer>
    </div>
  );
}