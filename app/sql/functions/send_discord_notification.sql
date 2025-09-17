CREATE OR REPLACE FUNCTION send_discord_notification(
    webhook_url TEXT,
    message TEXT
) RETURNS TEXT AS $$
DECLARE
    request_id bigint;
BEGIN
    SELECT net.http_post(
        url => webhook_url,
        body => json_build_object('content', message)::jsonb,
        headers => '{"Content-Type": "application/json"}'::jsonb
    ) INTO request_id;

    RETURN 'Discord 알림 전송 완료 (request_id: ' || request_id || ')';
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'Discord 알림 전송 실패: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql;
