'use client'

import React, { useState } from 'react'
import { useFormFields, useForm } from '@payloadcms/ui'
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Sparkles,
  UserCheck,
  Calendar,
  FileText,
  AlertTriangle,
} from 'lucide-react'

export const ReplyMessagePanel: React.FC = () => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  const form = useForm()

  const idField = useFormFields(([fields]) => fields.id)
  const emailField = useFormFields(([fields]) => fields.email)
  const nameField = useFormFields(([fields]) => fields.name)
  const subjectField = useFormFields(([fields]) => fields.subject)
  const statusField = useFormFields(([fields]) => fields.status)
  const repliedAtField = useFormFields(([fields]) => fields.repliedAt)
  const replySubjectField = useFormFields(([fields]) => fields.replySubject)
  const replyBodyField = useFormFields(([fields]) => fields.replyBody)
  const repliedByField = useFormFields(([fields]) => fields.repliedBy)

  const messageId = idField?.value as string | undefined
  const recipientEmail = emailField?.value as string | undefined
  const recipientName = (nameField?.value as string) || ''
  const currentSubject = (subjectField?.value as string) || ''
  const formStatus = (statusField?.value as string) || 'new'
  const formRepliedAt = repliedAtField?.value as string | undefined
  const formReplyBody = replyBodyField?.value as string | undefined
  const formReplySubject = replySubjectField?.value as string | undefined
  const formRepliedBy = repliedByField?.value as string | undefined

  // Local state to instantly reflect new reply data without waiting for full reload
  const [localReplyData, setLocalReplyData] = useState<{
    status?: string
    repliedAt?: string
    replySubject?: string
    replyBody?: string
    repliedBy?: string
  } | null>(null)

  const currentStatus = localReplyData?.status || formStatus
  const repliedAt = localReplyData?.repliedAt || formRepliedAt
  const pastReplyBody = localReplyData?.replyBody || formReplyBody
  const pastReplySubject = localReplyData?.replySubject || formReplySubject
  const repliedBy = localReplyData?.repliedBy || formRepliedBy

  const [isOpen, setIsOpen] = useState(false)
  const [subject, setSubject] = useState(currentSubject ? `Re: ${currentSubject}` : '')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'warning'
    text: string
  } | null>(null)

  if (!mounted) return null

  if (!messageId) {
    return (
      <div style={{
        padding: '16px 20px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: '1px dashed rgba(255, 255, 255, 0.15)',
        color: '#94a3b8',
        fontSize: '13px',
        textAlign: 'center',
      }}>
        Enregistrez d'abord ce message pour accéder au module de réponse par email.
      </div>
    )
  }

  const isReplied = currentStatus === 'replied' || !!repliedAt

  const handleSend = async () => {
    if (!content.trim()) {
      setFeedback({ type: 'error', text: 'Veuillez saisir le texte de votre réponse.' })
      return
    }

    if (!recipientEmail) {
      setFeedback({ type: 'error', text: 'Aucune adresse email trouvée pour ce message.' })
      return
    }

    setLoading(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/admin/reply-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          recipientEmail,
          recipientName,
          replySubject: subject || `Re: ${currentSubject || 'Votre demande'}`,
          replyContent: content,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi.')
      }

      const returnedDoc = data.doc || {}
      const newStatus = returnedDoc.status || 'replied'
      const newRepliedAt = returnedDoc.repliedAt || new Date().toISOString()
      const newReplySubject = returnedDoc.replySubject || subject
      const newReplyBody = returnedDoc.replyBody || content
      const newRepliedBy = returnedDoc.repliedBy || 'Admin'

      // 1. Instantly update local component state
      setLocalReplyData({
        status: newStatus,
        repliedAt: newRepliedAt,
        replySubject: newReplySubject,
        replyBody: newReplyBody,
        repliedBy: newRepliedBy,
      })

      // 2. Dispatch live updates to Payload form state so the tabs reflect the data immediately
      if (form && typeof form.dispatchFields === 'function') {
        form.dispatchFields({ type: 'UPDATE', path: 'status', value: newStatus })
        form.dispatchFields({ type: 'UPDATE', path: 'repliedAt', value: newRepliedAt })
        form.dispatchFields({ type: 'UPDATE', path: 'replySubject', value: newReplySubject })
        form.dispatchFields({ type: 'UPDATE', path: 'replyBody', value: newReplyBody })
        form.dispatchFields({ type: 'UPDATE', path: 'repliedBy', value: newRepliedBy })
      }

      setFeedback({
        type: data.warning === 'SMTP_CONFIG_MISSING' ? 'warning' : 'success',
        text: data.message || 'Réponse enregistrée et statut mis à jour en Répondu !',
      })
      setContent('')
      setIsOpen(false)
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Impossible d\'envoyer le message.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      margin: '20px 0',
      background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.6))',
      border: isReplied ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(0, 180, 216, 0.3)',
      borderRadius: '16px',
      padding: '22px',
      boxShadow: isReplied
        ? '0 10px 30px -10px rgba(34, 197, 94, 0.2)'
        : '0 10px 30px -10px rgba(0, 180, 216, 0.25)',
      backdropFilter: 'blur(20px)',
      color: '#f8fafc',
      fontFamily: 'inherit',
    }}>
      {/* Header status bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '18px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: isReplied
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))'
              : 'linear-gradient(135deg, rgba(0, 180, 216, 0.2), rgba(2, 132, 199, 0.1))',
            border: isReplied ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(0, 180, 216, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isReplied ? '#4ade80' : '#38bdf8',
            boxShadow: isReplied ? '0 0 15px rgba(34, 197, 94, 0.25)' : '0 0 15px rgba(0, 180, 216, 0.25)',
          }}>
            <Mail size={20} />
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              Centre de Réponse Email Directe
              {isReplied ? (
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#4ade80',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  letterSpacing: '0.02em',
                }}>
                  <CheckCircle2 size={13} /> Traité & Répondu
                </span>
              ) : (
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  letterSpacing: '0.02em',
                }}>
                  <Clock size={13} /> En attente de réponse
                </span>
              )}
            </div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '4px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
              <span>
                Destinataire : <strong style={{ color: '#38bdf8', fontWeight: '600' }}>{recipientEmail || 'Non spécifié'}</strong> {recipientName ? `(${recipientName})` : ''}
              </span>
              {isReplied && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#4ade80',
                  background: 'rgba(34, 197, 94, 0.12)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  <Calendar size={13} />
                  Date d'envoi : {repliedAt ? new Date(repliedAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) : 'Enregistrée'}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen)
            if (!subject && currentSubject) {
              setSubject(`Re: ${currentSubject}`)
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: isOpen
              ? 'rgba(255, 255, 255, 0.1)'
              : 'linear-gradient(135deg, #0284c7 0%, #00b4d8 100%)',
            color: '#ffffff',
            border: isOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isOpen ? 'none' : '0 4px 18px rgba(0, 180, 216, 0.35)',
          }}
        >
          <Send size={15} />
          {isOpen ? 'Masquer le formulaire' : (isReplied ? 'Envoyer une nouvelle réponse' : 'Rédiger une réponse')}
        </button>
      </div>

      {/* Historical summary if already replied */}
      {isReplied && (
        <div style={{
          marginBottom: '20px',
          padding: '18px 20px',
          background: 'linear-gradient(145deg, rgba(34, 197, 94, 0.08), rgba(15, 23, 42, 0.6))',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          borderRadius: '14px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Suivi & Historique :
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#94a3b8' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#f8fafc',
                background: 'rgba(255, 255, 255, 0.07)',
                padding: '3px 10px',
                borderRadius: '6px',
                fontWeight: '600'
              }}>
                <Calendar size={13} style={{ color: '#4ade80' }} />
                Date d'envoi de la réponse : {repliedAt ? new Date(repliedAt).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' }) : 'Indiquée lors de la validation'}
              </span>
              {repliedBy && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#cbd5e1' }}>
                  <UserCheck size={13} /> par {repliedBy}
                </span>
              )}
            </div>
          </div>

          {pastReplySubject && (
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#f1f5f9',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <FileText size={14} style={{ color: '#38bdf8' }} /> Objet : {pastReplySubject}
            </div>
          )}

          {pastReplyBody ? (
            <div style={{
              fontSize: '13px',
              color: '#e2e8f0',
              lineHeight: '1.65',
              whiteSpace: 'pre-wrap',
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '14px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {pastReplyBody}
            </div>
          ) : (
            <div style={{
              fontSize: '12.5px',
              color: '#94a3b8',
              fontStyle: 'italic',
              background: 'rgba(0, 0, 0, 0.15)',
              padding: '10px 14px',
              borderRadius: '8px',
            }}>
              Message marqué comme répondu. Vous pouvez consulter les détails ou lui envoyer un nouvel email ci-dessous.
            </div>
          )}
        </div>
      )}

      {/* Feedback message */}
      {feedback && (
        <div style={{
          marginBottom: '18px',
          padding: '14px 18px',
          borderRadius: '12px',
          fontSize: '13.5px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background:
            feedback.type === 'success'
              ? 'rgba(34, 197, 94, 0.15)'
              : feedback.type === 'warning'
              ? 'rgba(245, 158, 11, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
          color:
            feedback.type === 'success'
              ? '#4ade80'
              : feedback.type === 'warning'
              ? '#fbbf24'
              : '#f87171',
          border:
            feedback.type === 'success'
              ? '1px solid rgba(34, 197, 94, 0.3)'
              : feedback.type === 'warning'
              ? '1px solid rgba(245, 158, 11, 0.3)'
              : '1px solid rgba(239, 68, 68, 0.3)',
        }}>
          {feedback.type === 'success' ? (
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          ) : feedback.type === 'warning' ? (
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          ) : (
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Reply compose form */}
      {isOpen && (
        <div style={{
          marginTop: '16px',
          padding: '22px',
          background: 'rgba(15, 23, 42, 0.75)',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
              Objet de l'email :
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Objet de la réponse..."
              style={{
                width: '100%',
                padding: '12px 14px',
                background: '#090d16',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#00B4D8'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
              Corps de votre réponse professionnelle :
            </label>
            <textarea
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez ici votre réponse personnalisée. Elle sera mise en forme avec le gabarit officiel NOB TECHNOLOGIES..."
              style={{
                width: '100%',
                padding: '14px',
                background: '#090d16',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '13.5px',
                lineHeight: '1.65',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#00B4D8'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#64748b', marginTop: '6px' }}>
              <Sparkles size={13} style={{ color: '#00B4D8' }} /> Le destinataire recevra un email aux couleurs de NOB TECHNOLOGIES avec accusé et signature.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={loading}
              style={{
                padding: '10px 18px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#94a3b8',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #0284c7 0%, #00b4d8 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                boxShadow: '0 4px 16px rgba(0, 180, 216, 0.35)',
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={15} className="animate-spin" /> Envoi et enregistrement...
                </>
              ) : (
                <>
                  <Send size={15} /> Envoyer la réponse au client
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

