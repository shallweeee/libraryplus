CREATE OR REPLACE FUNCTION get_notification_config(
    config_name TEXT DEFAULT 'notification_default'
)
RETURNS TABLE (
    table_name TEXT,
    status_column TEXT,
    target_status TEXT,
    webhook_url TEXT
) AS $$
DECLARE
    config_json JSONB;
BEGIN
    SELECT config INTO config_json
    FROM config
    WHERE name = config_name;

    IF config_json IS NULL THEN
        RAISE EXCEPTION '설정 "%"을 찾을 수 없습니다', config_name;
    END IF;

    table_name := config_json->>'table_name';
    status_column := config_json->>'status_column';
    target_status := config_json->>'target_status';
    webhook_url := config_json->>'webhook_url';

    IF table_name IS NULL OR status_column IS NULL OR target_status IS NULL OR webhook_url IS NULL THEN
        RAISE EXCEPTION '설정에 필수 값이 누락되었습니다';
    END IF;

    RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
