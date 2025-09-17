CREATE OR REPLACE FUNCTION check_and_notify_from_config(
    config_name TEXT DEFAULT 'notification_default'
)
RETURNS TEXT AS $$
DECLARE
    config RECORD;
    request_count INTEGER;
    sql_query TEXT;
    notification_message TEXT;
    result TEXT;
BEGIN
    SELECT * INTO config FROM get_notification_config(config_name);

    sql_query := format('SELECT COUNT(*) FROM %I WHERE %I::text = $1', config.table_name, config.status_column);
    EXECUTE sql_query INTO request_count USING config.target_status;

    IF request_count > 0 THEN
        notification_message := format(
            E'현재 **%s개**의 %s 상태 항목이 대기 중입니다.\n시간: %s',
            request_count,
            config.target_status,
            NOW()::timestamp(0)
        );

        SELECT send_discord_notification(config.webhook_url, notification_message) INTO result;

        RETURN format('알림 전송됨: %s개 항목 발견 - %s', request_count, result);
    ELSE
        RETURN format('알림 불필요: %s 상태 항목 없음', config.target_status);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RETURN 'Error: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql;
