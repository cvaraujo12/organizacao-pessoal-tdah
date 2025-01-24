declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
  }
}

export class AnalyticsService {
  private static readonly MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

  static initialize(): void {
    if (typeof window === 'undefined' || !this.MEASUREMENT_ID) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', this.MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }

  static trackPageView(url: string): void {
    if (!this.MEASUREMENT_ID) return;
    window.gtag('config', this.MEASUREMENT_ID, {
      page_path: url,
    });
  }

  static trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number
  ): void {
    if (!this.MEASUREMENT_ID) return;
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Eventos específicos do TDAH
  static trackFocusSession(duration: number, completed: boolean): void {
    this.trackEvent(
      'Focus',
      completed ? 'session_completed' : 'session_interrupted',
      undefined,
      duration
    );
  }

  static trackTaskCompletion(
    category: string,
    timeToComplete: number,
    wasOverdue: boolean
  ): void {
    this.trackEvent('Task', 'completion', category, timeToComplete);
    if (wasOverdue) {
      this.trackEvent('Task', 'overdue_completion', category);
    }
  }

  static trackRoutineAdherence(
    category: string,
    adherenceRate: number,
    streak: number
  ): void {
    this.trackEvent('Routine', 'adherence', category, adherenceRate);
    if (streak > 0) {
      this.trackEvent('Routine', 'streak', category, streak);
    }
  }

  static trackGoalProgress(
    category: string,
    progress: number,
    achieved: boolean
  ): void {
    this.trackEvent('Goal', achieved ? 'achieved' : 'progress', category, progress);
  }

  static trackHealthMetrics(metrics: {
    sleepQuality?: number;
    exerciseMinutes?: number;
    meditationMinutes?: number;
    mood?: number;
    medicationAdherence?: boolean;
  }): void {
    if (metrics.sleepQuality !== undefined) {
      this.trackEvent('Health', 'sleep_quality', undefined, metrics.sleepQuality);
    }
    if (metrics.exerciseMinutes !== undefined) {
      this.trackEvent('Health', 'exercise', undefined, metrics.exerciseMinutes);
    }
    if (metrics.meditationMinutes !== undefined) {
      this.trackEvent(
        'Health',
        'meditation',
        undefined,
        metrics.meditationMinutes
      );
    }
    if (metrics.mood !== undefined) {
      this.trackEvent('Health', 'mood', undefined, metrics.mood);
    }
    if (metrics.medicationAdherence !== undefined) {
      this.trackEvent(
        'Health',
        'medication',
        metrics.medicationAdherence ? 'taken' : 'missed'
      );
    }
  }

  static trackFeatureUsage(feature: string, action: string): void {
    this.trackEvent('Feature', action, feature);
  }

  static trackError(
    category: string,
    action: string,
    error: Error | string
  ): void {
    this.trackEvent(
      'Error',
      action,
      category,
      typeof error === 'string' ? undefined : error.message
    );
  }

  static trackPerformanceMetric(
    metric: string,
    value: number,
    label?: string
  ): void {
    this.trackEvent('Performance', metric, label, value);
  }

  static trackAccessibilityInteraction(
    feature: string,
    action: string
  ): void {
    this.trackEvent('Accessibility', action, feature);
  }

  static trackSearch(
    category: string,
    query: string,
    resultsCount: number
  ): void {
    this.trackEvent('Search', category, query, resultsCount);
  }

  static trackFilter(
    category: string,
    filters: Record<string, any>
  ): void {
    this.trackEvent('Filter', category, JSON.stringify(filters));
  }

  static trackSort(
    category: string,
    field: string,
    direction: 'asc' | 'desc'
  ): void {
    this.trackEvent('Sort', category, `${field}_${direction}`);
  }

  static trackShare(
    category: string,
    method: string,
    successful: boolean
  ): void {
    this.trackEvent('Share', category, `${method}_${successful ? 'success' : 'fail'}`);
  }

  static trackExport(
    category: string,
    format: string,
    successful: boolean
  ): void {
    this.trackEvent('Export', category, `${format}_${successful ? 'success' : 'fail'}`);
  }

  static trackNotification(
    type: string,
    action: 'sent' | 'clicked' | 'dismissed'
  ): void {
    this.trackEvent('Notification', action, type);
  }
} 