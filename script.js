// Função para ativar o menu mobile
document.addEventListener("DOMContentLoaded", function() {
    // Menu Mobile Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do ícone do menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Fechar o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        });
    });
    
    // Efeito de scroll no header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Carrossel de depoimentos
    const testimonialTrack = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (testimonialTrack && prevBtn && nextBtn) {
        let slideIndex = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const slideWidth = 100; // 100% da largura do container
        
        // Configurar o carrossel inicialmente
        testimonialTrack.style.transform = `translateX(0%)`;
        
        // Botão Próximo
        nextBtn.addEventListener('click', function() {
            if (slideIndex < testimonials.length - 1) {
                slideIndex++;
                testimonialTrack.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
            } else {
                // Voltar para o primeiro slide com uma animação suave
                slideIndex = 0;
                testimonialTrack.style.transform = `translateX(0%)`;
            }
        });
        
        // Botão Anterior
        prevBtn.addEventListener('click', function() {
            if (slideIndex > 0) {
                slideIndex--;
                testimonialTrack.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
            } else {
                // Ir para o último slide
                slideIndex = testimonials.length - 1;
                testimonialTrack.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
            }
        });
        
        // Autoplay do carrossel
        let autoplayInterval = setInterval(function() {
            nextBtn.click();
        }, 5000);
        
        // Parar o autoplay quando o usuário interage com os controles
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                clearInterval(autoplayInterval);
            });
            
            btn.addEventListener('mouseleave', function() {
                autoplayInterval = setInterval(function() {
                    nextBtn.click();
                }, 5000);
            });
        });
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulando envio do formulário
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulação de envio com timeout
            setTimeout(function() {
                submitButton.textContent = 'Mensagem Enviada!';
                
                // Mostrar mensagem de sucesso
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.display = 'none';
                });
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #5e6b9e; margin-bottom: 20px;"></i>
                    <h3>Mensagem Enviada com Sucesso!</h3>
                    <p>Agradecemos seu contato. Retornaremos em breve.</p>
                    <button class="btn" style="margin-top: 20px;">Enviar Nova Mensagem</button>
                `;
                
                contactForm.appendChild(successMessage);
                
                // Resetar o formulário se o usuário clicar em "Enviar Nova Mensagem"
                const resetButton = successMessage.querySelector('.btn');
                resetButton.addEventListener('click', function() {
                    contactForm.reset();
                    successMessage.remove();
                    formGroups.forEach(group => {
                        group.style.display = 'block';
                    });
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
                
            }, 2000);
        });
    }
    
    // Formulário de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = newsletterForm.querySelector('input[type="email"]');
            const button = newsletterForm.querySelector('button');
            const originalHTML = button.innerHTML;
            
            // Animação ao enviar
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Simulação de envio
            setTimeout(function() {
                button.innerHTML = '<i class="fas fa-check"></i>';
                input.value = '';
                input.disabled = true;
                
                // Mensagem de sucesso
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Inscrição realizada com sucesso!';
                successMessage.style.color = '#fff';
                successMessage.style.marginTop = '10px';
                newsletterForm.parentNode.appendChild(successMessage);
                
                // Restaurar formulário após alguns segundos
                setTimeout(function() {
                    button.innerHTML = originalHTML;
                    input.disabled = false;
                    successMessage.remove();
                }, 3000);
                
            }, 1500);
        });
    }
    
    // Animação de entrada para seções
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elementos que devem ser animados ao entrar na viewport
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Adicionar classe de animação quando o elemento está visível
    document.addEventListener('scroll', function() {
        sections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('animate')) {
                section.classList.add('animate');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Função auxiliar para verificar se o elemento está na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular a posição de rolagem, compensando a altura do header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Adicionar estilos CSS dinâmicos para o menu toggle quando ativo
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle span.active:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .menu-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle span.active:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        section.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
