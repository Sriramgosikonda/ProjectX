// Performance monitoring utilities
export const performanceMonitor = {
  // Track Core Web Vitals
  trackWebVitals: () => {
    if (typeof window !== 'undefined') {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any;
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        }
      }).observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        console.log('CLS:', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Track long tasks
  trackLongTasks: () => {
    if (typeof window !== 'undefined') {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry.duration, 'ms');
          }
        }
      }).observe({ entryTypes: ['longtask'] });
    }
  },

  // Memory usage monitoring
  trackMemoryUsage: () => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      setInterval(() => {
        const memInfo = (performance as any).memory;
        console.log('Memory usage:', {
          used: Math.round(memInfo.usedJSHeapSize / 1048576 * 100) / 100 + ' MB',
          total: Math.round(memInfo.totalJSHeapSize / 1048576 * 100) / 100 + ' MB',
          limit: Math.round(memInfo.jsHeapSizeLimit / 1048576 * 100) / 100 + ' MB'
        });
      }, 10000);
    }
  }
};

// Error boundary helper
export const errorReporter = {
  reportError: (error: Error, errorInfo?: any) => {
    console.error('Error caught by boundary:', error, errorInfo);
    // In production, send to error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }
};