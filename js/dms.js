// DMS (Document Management System) functionality

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const searchInput = document.getElementById('search-docs');
    const categoryFilter = document.getElementById('filter-category');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const dmsDocsList = document.getElementById('dms-docs-list');

    // Load documents from localStorage on page load
    loadDocuments();

    // Upload area click handler
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') fileInput.click();
    });

    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // File input change handler
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Search functionality
    searchInput.addEventListener('input', filterDocuments);

    // Category filter
    categoryFilter.addEventListener('change', filterDocuments);

    // Clear filters
    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        categoryFilter.value = '';
        filterDocuments();
    });

    function handleFiles(files) {
        let docs = getDocuments();
        
        for (let file of files) {
            const doc = {
                id: Date.now() + Math.random(),
                name: file.name,
                category: categorizeFile(file.name),
                dateUploaded: new Date().toLocaleDateString(),
                size: formatFileSize(file.size),
                sizeBytes: file.size,
                type: file.type,
                data: URL.createObjectURL(file) // Store file reference
            };
            docs.push(doc);
        }
        
        saveDocuments(docs);
        loadDocuments();
        fileInput.value = ''; // Reset file input
    }

    function categorizeFile(fileName) {
        const name = fileName.toLowerCase();
        if (name.includes('permit') || name.includes('license')) return 'permits';
        if (name.includes('cert') || name.includes('certificate')) return 'certificates';
        if (name.includes('report')) return 'reports';
        if (name.includes('ordinance') || name.includes('order')) return 'ordinances';
        return 'other';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    function getDocuments() {
        const stored = localStorage.getItem('dms_documents');
        return stored ? JSON.parse(stored) : [];
    }

    function saveDocuments(docs) {
        localStorage.setItem('dms_documents', JSON.stringify(docs));
    }

    function loadDocuments() {
        const docs = getDocuments();
        renderDocuments(docs);
    }

    function renderDocuments(docs) {
        if (docs.length === 0) {
            dmsDocsList.innerHTML = '<tr class="empty-state"><td colspan="5">No documents yet. Upload your first document to get started.</td></tr>';
            return;
        }

        dmsDocsList.innerHTML = docs.map(doc => `
            <tr>
                <td><span class="doc-name">📄 ${doc.name}</span></td>
                <td>${getCategoryLabel(doc.category)}</td>
                <td>${doc.dateUploaded}</td>
                <td>${doc.size}</td>
                <td>
                    <div class="doc-actions">
                        <button class="doc-btn" onclick="downloadDoc('${doc.id}')" title="Download">⬇</button>
                        <button class="doc-btn" onclick="viewDoc('${doc.id}')" title="View">👁</button>
                        <button class="doc-btn delete" onclick="deleteDoc('${doc.id}')" title="Delete">🗑</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function filterDocuments() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        let docs = getDocuments();

        docs = docs.filter(doc => {
            const matchesSearch = doc.name.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || doc.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderDocuments(docs);
    }

    function getCategoryLabel(category) {
        const labels = {
            'permits': 'Permits & Licenses',
            'certificates': 'Certificates',
            'reports': 'Reports',
            'ordinances': 'Ordinances',
            'other': 'Other'
        };
        return labels[category] || category;
    }

    window.downloadDoc = function(docId) {
        const docs = getDocuments();
        const doc = docs.find(d => d.id == docId);
        if (doc) {
            const link = document.createElement('a');
            link.href = doc.data;
            link.download = doc.name;
            link.click();
        }
    };

    window.viewDoc = function(docId) {
        const docs = getDocuments();
        const doc = docs.find(d => d.id == docId);
        if (doc) {
            window.open(doc.data, '_blank');
        }
    };

    window.deleteDoc = function(docId) {
        if (confirm('Are you sure you want to delete this document?')) {
            let docs = getDocuments();
            docs = docs.filter(d => d.id != docId);
            saveDocuments(docs);
            loadDocuments();
        }
    };
});
