import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
    // 애니메이션 방식
    easing: 'ease',
    // 진행 표시줄의 속도
    speed: 500,
    // Spinner 출력 여부
    showSpinner: false,
    // 프로그레스바 거리 간격
    trickleSpeed: 200,
    // 초기화 시 최소 백분율
    minimum: 0.3,
});

export default NProgress;
