// 移动端菜单
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，初始化移动端菜单...');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    console.log('菜单按钮元素:', menuToggle);
    console.log('导航元素:', nav);
    
    // 检查元素是否存在
    if (menuToggle && nav) {
        console.log('菜单元素已找到，设置事件监听器');
        
        // 移除可能已存在的事件监听器
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // 添加新的事件监听器
        newMenuToggle.addEventListener('click', function() {
            console.log('菜单按钮被点击');
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // 防止菜单打开时页面滚动
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('菜单已打开');
            } else {
                document.body.style.overflow = '';
                console.log('菜单已关闭');
            }
        });
        
        // 点击导航链接后自动关闭菜单
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                newMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // 点击菜单外部关闭
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && 
                !nav.contains(event.target) && 
                !newMenuToggle.contains(event.target)) {
                nav.classList.remove('active');
                newMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('未找到菜单元素，无法初始化移动端菜单');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // 关闭移动端菜单
            const nav = document.querySelector('.nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// 页面加载进度条
let progressBar;

function createProgressBar() {
    progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(to right, #1a90ff, #00f2fe);
        transition: width 0.2s ease;
        z-index: 9999;
    `;
    document.body.appendChild(progressBar);
}

function updateProgress(progress) {
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// 优化的页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => {
        if (progressBar) {
            progressBar.style.opacity = '0';
            setTimeout(() => progressBar.remove(), 300);
        }
    }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    createProgressBar();
    updateProgress(30);
    
    // 模拟资源加载进度
    setTimeout(() => updateProgress(60), 200);
    setTimeout(() => updateProgress(80), 400);
    setTimeout(() => updateProgress(100), 600);
    
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});

// 复制到剪贴板功能
function copyToClipboard(text) {
    // 创建一个临时的textarea元素
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // 确保textarea不可见
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        // 尝试复制
        const successful = document.execCommand('copy');
        const msg = successful ? '已复制: ' + text : '复制失败，请手动复制';
        console.log(msg);
        
        // 显示复制成功的提示
        showCopyToast(text);
    } catch (err) {
        console.error('复制失败:', err);
        showToast('复制失败，请手动复制');
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功的提示
function showCopyToast(text) {
    showToast(`已复制到剪贴板: ${text}`);
}

// 显示Toast提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 显示动画
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });
    
    // 3秒后消失
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 检测设备类型
function detectDevice() {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
        return 'android';
    }
    if (/iPad|iPhone|iPod/.test(ua)) {
        return 'ios';
    }
    if (/Win/.test(ua)) {
        return 'windows';
    }
    if (/Mac/.test(ua)) {
        return 'mac';
    }
    return 'unknown';
}

// 根据设备类型显示下载按钮
document.addEventListener('DOMContentLoaded', function() {
    const device = detectDevice();
    const downloadButtons = document.querySelectorAll('.download-links a');
    downloadButtons.forEach(button => {
        if (button.getAttribute('data-os') === device) {
            button.classList.add('recommended');
        }
    });
});

// 添加滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    // 添加滚动动画
    document.querySelectorAll('.feature-card, .price-card, .carrier-logos img').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
});

// 打字机效果
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['NetFly Fast!', '点亮全球，你值得拥有!'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isWaiting = true;
        setTimeout(() => {
            isDeleting = true;
            isWaiting = false;
        }, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 100 : 200;
    if (!isWaiting) {
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(type, 1500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }
});

// 初始化 Owl Carousel
function owlcarousel() {
    $('.owl-carousel').each(function() {
        var $carousel = $(this);
        $carousel.owlCarousel({
            items: $carousel.data("items"),
            slideBy: 1,
            center: false,
            loop: true,
            margin: $carousel.data("margin"),
            dots: false,
            nav: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplaySpeed: 500,
            autoplayHoverPause: true,
            smartSpeed: 500,
            responsive: {
                0: {
                    items: $carousel.data('xs-items') ? $carousel.data('xs-items') : 1,
                    margin: 20
                },
                576: {
                    items: $carousel.data('sm-items'),
                    margin: 25
                },
                768: {
                    items: $carousel.data('md-items'),
                    margin: 30
                },
                1024: {
                    items: $carousel.data('lg-items'),
                    margin: 30
                },
                1200: {
                    items: $carousel.data("items"),
                    margin: 30
                }
            }
        });
    });
}

$(document).ready(function() {
    owlcarousel();
}); 