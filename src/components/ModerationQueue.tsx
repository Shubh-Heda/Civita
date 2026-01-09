import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import chatService from '../services/chatService';
import { supabase } from '../lib/supabase';
import type { ChatMessageReport } from '../services/chatService';
import { X, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export function ModerationQueue() {
  const [reports, setReports] = useState<(ChatMessageReport & { 
    message?: any; 
    reporter?: any; 
    room?: any;
  })[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  useEffect(() => {
    loadReports();
  }, [filter]);

  const loadReports = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('chat_message_reports')
        .select(`
          *,
          message:chat_messages(content, sender_id),
          reporter:profiles!chat_message_reports_reporter_id_fkey(id, full_name, avatar_url),
          room:chat_rooms(name)
        `)
        .order('created_at', { ascending: false });

      if (filter === 'pending') {
        query = query.eq('status', 'pending');
      }

      const { data, error } = await query;
      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleActionReport = async (reportId: string, action: 'actioned' | 'dismissed', deleteMessage: boolean = false) => {
    try {
      const report = reports.find(r => r.id === reportId);
      if (!report) return;

      // Update report status
      const { error: updateError } = await supabase
        .from('chat_message_reports')
        .update({
          status: action,
          actioned_at: new Date().toISOString(),
          actioned_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', reportId);

      if (updateError) throw updateError;

      // If actioned and should delete message
      if (action === 'actioned' && deleteMessage) {
        await chatService.deleteMessage(report.room_id, report.message_id, `Report ${reportId}: ${report.reason}`);
      }

      toast.success(`Report ${action}`);
      loadReports();
    } catch (error) {
      console.error('Error actioning report:', error);
      toast.error('Failed to action report');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Moderation Queue</h1>
        <p className="text-slate-600">Review and action reported messages</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          Pending ({reports.filter(r => r.status === 'pending').length})
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Reports
        </Button>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No reports to review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={
                      report.status === 'pending' ? 'default' :
                      report.status === 'actioned' ? 'secondary' : 'outline'
                    }>
                      {report.status}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {report.room?.name || 'Unknown Room'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">
                    Reported by <span className="font-semibold">{report.reporter?.full_name || 'Unknown'}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded p-4 mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Reported Message:</p>
                <p className="text-slate-900">{report.message?.content || '[Message deleted]'}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-1">Reason:</p>
                <p className="text-slate-900">{report.reason}</p>
                {report.details && (
                  <>
                    <p className="text-sm font-semibold text-slate-700 mt-2 mb-1">Details:</p>
                    <p className="text-slate-600 text-sm">{report.details}</p>
                  </>
                )}
              </div>

              {report.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="gap-2"
                    onClick={() => handleActionReport(report.id, 'actioned', true)}
                  >
                    <Check className="w-4 h-4" />
                    Delete Message
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleActionReport(report.id, 'actioned', false)}
                  >
                    <Check className="w-4 h-4" />
                    Action Without Delete
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleActionReport(report.id, 'dismissed')}
                  >
                    <X className="w-4 h-4" />
                    Dismiss
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
